const express = require("express");
const {
  startSession,
  getCurrentSession,
  submitAnswer,
  completeSession,
  getNextQuestion,
  getSessionResults,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");
const {
  validateStartSession,
  validateSubmitAnswer,
  validateSessionIdParam,
} = require("../validators/sessionValidator");

const router = express.Router();

router.post("/start", protect, validateStartSession, startSession);
router.get("/current", protect, getCurrentSession);
router.post("/answer", protect, validateSubmitAnswer, submitAnswer);
router.post("/:sessionId/complete", protect, validateSessionIdParam, completeSession);
router.get("/:sessionId/next-question", protect, validateSessionIdParam, getNextQuestion);
router.get("/:sessionId/results", protect, validateSessionIdParam, getSessionResults);

module.exports = router;
