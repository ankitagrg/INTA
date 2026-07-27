const mongoose = require("mongoose");

const evaluationResultSchema = new mongoose.Schema(
  {
    response: { type: mongoose.Schema.Types.ObjectId, ref: "Response", required: true },
    tfidfScore: { type: Number, default: 0 },
    semanticSimilarity: { type: Number, default: 0 },
    grammarIssues: [{ type: String }],
    grammarScore: { type: Number, default: 0 },
    sentimentScore: { type: Number, default: 0 },
    keywordMatchScore: { type: Number, default: 0 },
    compositeScore: { type: Number, default: 0 },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EvaluationResult", evaluationResultSchema);
