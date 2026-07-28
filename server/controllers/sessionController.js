const InterviewSession = require("../models/InterviewSession");
const Question = require("../models/Question");
const Response = require("../models/Response");
const EvaluationResult = require("../models/EvaluationResult");
const { evaluateAnswer } = require("../services/ai/evaluationEngine");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

// A client-specified role narrows the question pool to that track (e.g.
// "java"). No role (or the "general" placeholder) means "any role within
// this category" — most technical questions are tagged by specific track,
// not "general", so this must stay optional rather than defaulting to an
// exact "general" match.
const roleFilter = (role) => (role && role !== "general" ? { role } : {});

// Difficulty band the *running* score falls into, per the adaptive rules.
const difficultyForScore = (score) => {
  if (score > 75) return "hard";
  if (score >= 50) return "medium";
  return "easy";
};

// Every session is scoped to the user who owns it — nothing here should be
// readable or mutable by a different logged-in user just by knowing/guessing
// a sessionId.
const assertOwnsSession = (session, userId) => {
  if (session.user.toString() !== userId) {
    throw new AppError("Not authorized to access this session", 403);
  }
};

// All question IDs this user has already been asked, across every session
// (not just the current one) — the basis for "prevent repeated questions".
const getAskedQuestionIds = async (userId, excludeSessionId = null) => {
  const query = { user: userId };
  if (excludeSessionId) query._id = { $ne: excludeSessionId };

  const pastSessions = await InterviewSession.find(query).select("questions").lean();
  const ids = new Set();
  pastSessions.forEach((s) => s.questions.forEach((id) => ids.add(String(id))));
  return ids;
};

// Tries to find a question the user hasn't seen before; if their unseen pool
// for this exact filter is exhausted, falls back to allowing a repeat rather
// than blocking them from continuing the interview entirely.
const findQuestion = async (baseQuery, excludedIds) => {
  const unseen = await Question.findOne({ ...baseQuery, _id: { $nin: Array.from(excludedIds) } });
  if (unseen) return unseen;
  return Question.findOne(baseQuery);
};

// Pure calculation — assumes session.responses is already populated with
// each response's evaluation sub-document.
const computeOverallScore = (session) => {
  const scores = session.responses.map((r) => r.evaluation?.finalScore || 0);
  return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
};

// Recomputes the final overall score from every stored response/evaluation
// and marks the session completed. Used both when the question pool runs
// out naturally and when the client explicitly ends the interview early.
const finalizeSession = async (session) => {
  await session.populate({ path: "responses", populate: { path: "evaluation" } });
  session.overallScore = computeOverallScore(session);
  session.status = "completed";
  await session.save();
  return session.overallScore;
};

// POST /api/sessions/start — start a new interview session
const startSession = asyncHandler(async (req, res) => {
  const { category, role } = req.body;

  const askedIds = await getAskedQuestionIds(req.user.id);
  const firstQuestion = await findQuestion(
    { category, difficulty: "medium", ...roleFilter(role) },
    askedIds
  );

  if (!firstQuestion) {
    throw new AppError(
      "No questions found for this category/role yet. Seed the Question collection first.",
      404
    );
  }

  const session = await InterviewSession.create({
    user: req.user.id,
    category,
    role: role || "general",
    questions: [firstQuestion._id],
  });

  sendSuccess(res, 201, "Session started", { session, question: firstQuestion });
});

// GET /api/sessions/current — the caller's active (in-progress) session, if any
const getCurrentSession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({
    user: req.user.id,
    status: "in-progress",
  }).sort({ createdAt: -1 });

  if (!session) {
    return sendSuccess(res, 200, "No active session", { session: null, question: null, answered: false });
  }

  const lastQuestionId = session.questions[session.questions.length - 1];
  const [question, alreadyAnswered] = await Promise.all([
    Question.findById(lastQuestionId),
    Response.exists({ session: session._id, question: lastQuestionId }),
  ]);

  sendSuccess(res, 200, "Current session fetched", {
    session,
    question,
    answered: Boolean(alreadyAnswered),
  });
});

// POST /api/sessions/answer — submit an answer, run AI evaluation, update running score + difficulty
const submitAnswer = asyncHandler(async (req, res) => {
  const { sessionId, questionId, answerText } = req.body;

  const session = await InterviewSession.findById(sessionId);
  const question = await Question.findById(questionId);

  if (!session || !question) {
    throw new AppError("Session or question not found", 404);
  }
  assertOwnsSession(session, req.user.id);

  const evaluation = await evaluateAnswer(answerText, {
    modelAnswer: question.modelAnswer,
    keywords: question.keywords,
  });

  // Store every response
  const responseDoc = await Response.create({
    session: sessionId,
    question: questionId,
    answerText,
  });

  const evaluationDoc = await EvaluationResult.create({
    ...evaluation,
    response: responseDoc._id,
  });

  responseDoc.evaluation = evaluationDoc._id;
  await responseDoc.save();

  session.responses.push(responseDoc._id);

  // Calculate running score: incremental average of finalScore across every
  // answer submitted so far in this session (not just the latest one).
  const answeredCount = session.responses.length;
  session.overallScore = Math.round(
    (session.overallScore * (answeredCount - 1) + evaluation.finalScore) / answeredCount
  );

  // Adaptive difficulty: next question's difficulty is driven by the
  // running score, so it doesn't swing wildly on one lucky/unlucky answer.
  session.currentDifficulty = difficultyForScore(session.overallScore);

  await session.save();

  sendSuccess(res, 200, "Answer submitted", { response: responseDoc, evaluation: evaluationDoc });
});

// GET /api/sessions/:sessionId/next-question — next question, adapted to current difficulty
const getNextQuestion = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const session = await InterviewSession.findById(sessionId);
  if (!session) {
    throw new AppError("Session not found", 404);
  }
  assertOwnsSession(session, req.user.id);

  const askedIds = await getAskedQuestionIds(session.user, session._id);
  session.questions.forEach((id) => askedIds.add(String(id)));

  const nextQuestion = await findQuestion(
    { category: session.category, difficulty: session.currentDifficulty, ...roleFilter(session.role) },
    askedIds
  );

  if (!nextQuestion) {
    await finalizeSession(session);
    return sendSuccess(res, 200, "No more questions. Session completed.", { session });
  }

  session.questions.push(nextQuestion._id);
  await session.save();

  sendSuccess(res, 200, "Next question fetched", { question: nextQuestion });
});

// POST /api/sessions/:sessionId/complete — explicitly end the interview early
const completeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const session = await InterviewSession.findById(sessionId);
  if (!session) {
    throw new AppError("Session not found", 404);
  }
  assertOwnsSession(session, req.user.id);

  const overallScore = await finalizeSession(session);

  sendSuccess(res, 200, "Session completed", { session, overallScore });
});

// GET /api/sessions/:sessionId/results — generate the final overall score + full breakdown
const getSessionResults = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const session = await InterviewSession.findById(sessionId)
    .populate("questions")
    .populate({ path: "responses", populate: { path: "evaluation" } });

  if (!session) {
    throw new AppError("Session not found", 404);
  }
  assertOwnsSession(session, req.user.id);

  // session.overallScore is already kept current after every answer
  // (see submitAnswer) — recomputed here too as a consistency check.
  const overallScore = computeOverallScore(session);
  session.overallScore = overallScore;
  await session.save();

  sendSuccess(res, 200, "Session results fetched", { session, overallScore });
});

module.exports = {
  startSession,
  getCurrentSession,
  submitAnswer,
  completeSession,
  getNextQuestion,
  getSessionResults,
};
