const InterviewSession = require("../models/InterviewSession");
const Question = require("../models/Question");
const Response = require("../models/Response");
const EvaluationResult = require("../models/EvaluationResult");
const CareerProfile = require("../models/CareerProfile");
const { evaluateAnswer } = require("../services/ai/evaluationEngine");
const { derivePrimaryRole } = require("../utils/techStack");
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

const assertOwnsSession = (session, userId) => {
  if (session.user.toString() !== userId) {
    throw new AppError("Not authorized to access this session", 403);
  }
};

// Shared by every :sessionId route — fetches the session (via whatever
// query the caller builds, e.g. with .populate() chained on) and enforces
// that it exists and belongs to the requesting user, so callers don't each
// repeat the same not-found/ownership boilerplate.
const getOwnedSession = async (userId, query) => {
  const session = await query;
  if (!session) {
    throw new AppError("Session not found", 404);
  }
  assertOwnsSession(session, userId);
  return session;
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

// Technical sessions default to a role derived from the caller's saved
// career profile (their tech-stack picks mapped to the closest seeded
// track — see utils/techStack.derivePrimaryRole) rather than requiring the
// client to pass one explicitly. HR/behavioral questions are all tagged
// "general" in the seed bank, so this only matters for "technical".
const resolveRole = async (userId, category, explicitRole) => {
  if (explicitRole) return explicitRole;
  if (category !== "technical") return "general";

  const profile = await CareerProfile.findOne({ user: userId }).lean();
  return profile ? derivePrimaryRole(profile.techStack) : "general";
};

// POST /api/sessions/start — start a new interview session
const startSession = asyncHandler(async (req, res) => {
  const { category, role: explicitRole } = req.body;
  const role = await resolveRole(req.user.id, category, explicitRole);

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
    role,
    questions: [firstQuestion._id],
  });

  sendSuccess(res, 201, "Session started", { session, question: firstQuestion });
});

// GET /api/sessions/current — the caller's active (in-progress) session, if any
const getCurrentSession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({
    user: req.user.id,
    status: "in-progress",
  })
    .sort({ createdAt: -1 })
    .lean();

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

  // Independent lookups — run concurrently instead of one-after-the-other.
  const [session, question] = await Promise.all([
    getOwnedSession(req.user.id, InterviewSession.findById(sessionId)),
    Question.findById(questionId),
  ]);

  if (!question) {
    throw new AppError("Question not found", 404);
  }

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
  const session = await getOwnedSession(req.user.id, InterviewSession.findById(sessionId));

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
  const session = await getOwnedSession(req.user.id, InterviewSession.findById(sessionId));

  const overallScore = await finalizeSession(session);

  sendSuccess(res, 200, "Session completed", { session, overallScore });
});

// GET /api/sessions/dashboard — aggregated stats across every session the user has ever run
const getDashboard = asyncHandler(async (req, res) => {
  const sessions = await InterviewSession.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate({
      path: "responses",
      populate: [{ path: "evaluation", select: "finalScore" }, { path: "question", select: "role category" }],
    })
    .lean();

  const scoredSessions = sessions.filter((s) => s.responses.length > 0);
  const allResponses = scoredSessions.flatMap((s) => s.responses);

  // Overall Score: average across every individual answer ever submitted.
  const answerScores = allResponses.map((r) => r.evaluation?.finalScore || 0);
  const overallScore = answerScores.length
    ? Math.round(answerScores.reduce((a, b) => a + b, 0) / answerScores.length)
    : 0;

  // Average / Best Score: computed at the session level (one full interview at a time).
  const sessionScores = scoredSessions.map((s) => s.overallScore);
  const averageScore = sessionScores.length
    ? Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)
    : 0;
  const bestScore = sessionScores.length ? Math.max(...sessionScores) : 0;

  // Recent Interviews — most recent 10 sessions regardless of status.
  const recentInterviews = sessions.slice(0, 10).map((s) => ({
    id: s._id,
    category: s.category,
    role: s.role,
    status: s.status,
    overallScore: s.overallScore,
    questionCount: s.responses.length,
    createdAt: s.createdAt,
  }));

  // Performance Trend — chronological (oldest → newest), last 20 scored sessions. Line chart.
  const performanceTrend = scoredSessions
    .slice(0, 20)
    .reverse()
    .map((s) => ({ date: s.createdAt, score: s.overallScore }));

  // Category-wise Scores — average score per category (technical/hr/behavioral). Bar chart.
  const categoryTotals = {};
  allResponses.forEach((r) => {
    const category = r.question?.category;
    if (!category) return;
    categoryTotals[category] ??= { sum: 0, count: 0 };
    categoryTotals[category].sum += r.evaluation?.finalScore || 0;
    categoryTotals[category].count += 1;
  });
  const categoryScores = Object.entries(categoryTotals).map(([category, { sum, count }]) => ({
    category,
    score: Math.round(sum / count),
  }));

  // Topic-wise Scores — average score per technical role (java, react, ...). Radar chart,
  // and the source for Strong/Weak Topics.
  const topicTotals = {};
  allResponses.forEach((r) => {
    if (r.question?.category !== "technical" || !r.question?.role) return;
    const { role } = r.question;
    topicTotals[role] ??= { sum: 0, count: 0 };
    topicTotals[role].sum += r.evaluation?.finalScore || 0;
    topicTotals[role].count += 1;
  });
  const topicScores = Object.entries(topicTotals)
    .map(([topic, { sum, count }]) => ({ topic, score: Math.round(sum / count) }))
    .sort((a, b) => b.score - a.score);

  const strongTopics = topicScores.slice(0, 3);
  const weakTopics = topicScores.slice(-3).reverse();

  sendSuccess(res, 200, "Dashboard data fetched", {
    overallScore,
    averageScore,
    bestScore,
    totalInterviews: sessions.length,
    recentInterviews,
    performanceTrend,
    categoryScores,
    topicScores,
    strongTopics,
    weakTopics,
  });
});

// GET /api/sessions/:sessionId/results — generate the final overall score + full breakdown
const getSessionResults = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const session = await getOwnedSession(
    req.user.id,
    InterviewSession.findById(sessionId)
      .populate("questions")
      .populate({ path: "responses", populate: { path: "evaluation" } })
  );

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
  getDashboard,
};
