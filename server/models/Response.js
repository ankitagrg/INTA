const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewSession", required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    answerText: { type: String, required: true },
    evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "EvaluationResult" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
