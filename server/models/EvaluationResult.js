const mongoose = require("mongoose");

const evaluationResultSchema = new mongoose.Schema(
  {
    // unique: true enforces the 1:1 relationship with Response at the DB
    // level (also creates an index for the response -> evaluation lookup).
    response: { type: mongoose.Schema.Types.ObjectId, ref: "Response", required: true, unique: true },
    finalScore: { type: Number, default: 0, min: 0, max: 100 },
    semanticScore: { type: Number, default: 0, min: 0, max: 1 },
    tfidfScore: { type: Number, default: 0, min: 0, max: 1 },
    grammarIssues: [{ type: String, trim: true }],
    grammarScore: { type: Number, default: 0, min: 0, max: 100 },
    sentiment: {
      label: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
      score: { type: Number, default: 0 },
      comparative: { type: Number, default: 0 }, // unbounded comparative score from the `sentiment` package
    },
    keywordScore: { type: Number, default: 0, min: 0, max: 1 },
    strengths: [{ type: String, trim: true }],
    weaknesses: [{ type: String, trim: true }],
    suggestions: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("EvaluationResult", evaluationResultSchema);
