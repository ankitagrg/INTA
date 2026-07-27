const express = require("express");
const {
  startSession,
  submitAnswer,
  getNextQuestion,
  getSessionResults,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/start", protect, startSession);
router.post("/answer", protect, submitAnswer);
router.get("/:sessionId/next-question", protect, getNextQuestion);
router.get("/:sessionId/results", protect, getSessionResults);

module.exports = router;
