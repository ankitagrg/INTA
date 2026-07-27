const InterviewSession = require("../models/InterviewSession");
const Question = require("../models/Question");
const Response = require("../models/Response");
const EvaluationResult = require("../models/EvaluationResult");
const { evaluateAnswer } = require("../services/ai/evaluationEngine");

// Start a new interview session
const startSession = async (req, res) => {
  try {
    const { category, role } = req.body;

    const firstQuestion = await Question.findOne({
      category,
      role: role || "general",
      difficulty: "medium",
    });

    if (!firstQuestion) {
      return res.status(404).json({ message: "No questions found for this category/role yet. Seed the Question collection first." });
    }

    const session = await InterviewSession.create({
      user: req.user.id,
      category,
      role: role || "general",
      questions: [firstQuestion._id],
    });

    return res.status(201).json({ session, question: firstQuestion });
  } catch (error) {
    return res.status(500).json({ message: "Failed to start session", error: error.message });
  }
};

// Submit an answer, run AI evaluation, and (optionally) fetch next question
const submitAnswer = async (req, res) => {
  try {
    const { sessionId, questionId, answerText } = req.body;

    const session = await InterviewSession.findById(sessionId);
    const question = await Question.findById(questionId);

    if (!session || !question) {
      return res.status(404).json({ message: "Session or question not found" });
    }

    const evaluation = await evaluateAnswer(answerText, {
      modelAnswer: question.modelAnswer,
      keywords: question.keywords,
    });

    const evaluationDoc = await EvaluationResult.create(evaluation);

    const responseDoc = await Response.create({
      session: sessionId,
      question: questionId,
      answerText,
      evaluation: evaluationDoc._id,
    });

    session.responses.push(responseDoc._id);

    // Simple adaptive difficulty: raise/lower based on this answer's score
    if (evaluation.compositeScore >= 75) session.currentDifficulty = "hard";
    else if (evaluation.compositeScore < 40) session.currentDifficulty = "easy";
    else session.currentDifficulty = "medium";

    await session.save();

    return res.status(200).json({ response: responseDoc, evaluation: evaluationDoc });
  } catch (error) {
    return res.status(500).json({ message: "Failed to submit answer", error: error.message });
  }
};

// Get the next question, adapted to current difficulty
const getNextQuestion = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await InterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const nextQuestion = await Question.findOne({
      category: session.category,
      role: session.role,
      difficulty: session.currentDifficulty,
      _id: { $nin: session.questions },
    });

    if (!nextQuestion) {
      session.status = "completed";
      await session.save();
      return res.status(200).json({ message: "No more questions. Session completed.", session });
    }

    session.questions.push(nextQuestion._id);
    await session.save();

    return res.status(200).json({ question: nextQuestion });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch next question", error: error.message });
  }
};

// Get full results for a completed session
const getSessionResults = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await InterviewSession.findById(sessionId)
      .populate("questions")
      .populate({ path: "responses", populate: { path: "evaluation" } });

    if (!session) return res.status(404).json({ message: "Session not found" });

    const scores = session.responses.map((r) => r.evaluation?.compositeScore || 0);
    const overallScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    session.overallScore = overallScore;
    await session.save();

    return res.status(200).json({ session, overallScore });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch results", error: error.message });
  }
};

module.exports = { startSession, submitAnswer, getNextQuestion, getSessionResults };
