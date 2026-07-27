const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: ["technical", "hr", "behavioral"], required: true },
    role: { type: String, default: "general" },
    status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
    currentDifficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    overallScore: { type: Number, default: 0 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);
