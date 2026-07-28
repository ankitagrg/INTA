const mongoose = require("mongoose");
const { CATEGORIES } = require("../models/Question");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateStartSession = (req, res, next) => {
  const { category, role } = req.body;

  if (typeof category !== "string" || !CATEGORIES.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `category is required and must be one of: ${CATEGORIES.join(", ")}`,
    });
  }
  if (role !== undefined && typeof role !== "string") {
    return res.status(400).json({ success: false, message: "role must be a string" });
  }

  next();
};

const validateSubmitAnswer = (req, res, next) => {
  const { sessionId, questionId, answerText } = req.body;

  if (typeof sessionId !== "string" || !isValidObjectId(sessionId)) {
    return res.status(400).json({ success: false, message: "A valid sessionId is required" });
  }
  if (typeof questionId !== "string" || !isValidObjectId(questionId)) {
    return res.status(400).json({ success: false, message: "A valid questionId is required" });
  }
  if (typeof answerText !== "string" || !answerText.trim()) {
    return res.status(400).json({ success: false, message: "answerText is required" });
  }

  next();
};

const validateSessionIdParam = (req, res, next) => {
  if (!isValidObjectId(req.params.sessionId)) {
    return res.status(400).json({ success: false, message: "Invalid sessionId" });
  }
  next();
};

module.exports = { validateStartSession, validateSubmitAnswer, validateSessionIdParam };
