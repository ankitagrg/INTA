const mongoose = require("mongoose");

const CATEGORIES = ["technical", "hr", "behavioral"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const STATUSES = ["in-progress", "completed"];

const interviewSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    role: { type: String, default: "general", trim: true, lowercase: true, maxlength: 50 },
    status: { type: String, enum: STATUSES, default: "in-progress" },
    currentDifficulty: { type: String, enum: DIFFICULTIES, default: "medium" },
    overallScore: { type: Number, default: 0, min: 0, max: 100 },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Supports "list this user's sessions" / "this user's in-progress sessions"
// lookups, which any session-history feature will need.
interviewSessionSchema.index({ user: 1, status: 1 });

interviewSessionSchema.virtual("questionCount").get(function () {
  return this.questions?.length || 0;
});

interviewSessionSchema.virtual("responseCount").get(function () {
  return this.responses?.length || 0;
});

interviewSessionSchema.virtual("isCompleted").get(function () {
  return this.status === "completed";
});

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);
