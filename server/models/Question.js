const mongoose = require("mongoose");

const CATEGORIES = ["technical", "hr", "behavioral"];
const DIFFICULTIES = ["easy", "medium", "hard"];

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true, minlength: 5, maxlength: 1000 },
    category: { type: String, enum: CATEGORIES, required: true },
    role: { type: String, default: "general", trim: true, lowercase: true, maxlength: 50 }, // e.g. "frontend", "backend", "general"
    difficulty: { type: String, enum: DIFFICULTIES, default: "medium" },
    modelAnswer: { type: String, required: true, trim: true, minlength: 10 }, // used for similarity scoring
    keywords: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Matches the exact query shape sessionController uses to pick the
// first/next question (category + role + difficulty lookups).
questionSchema.index({ category: 1, role: 1, difficulty: 1 });

questionSchema.virtual("keywordCount").get(function () {
  return this.keywords?.length || 0;
});

const Question = mongoose.model("Question", questionSchema);

// Exposed so other layers (e.g. validators) can reuse the same source of
// truth instead of duplicating the allowed-values list.
Question.CATEGORIES = CATEGORIES;
Question.DIFFICULTIES = DIFFICULTIES;

module.exports = Question;
