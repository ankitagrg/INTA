const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    category: { type: String, enum: ["technical", "hr", "behavioral"], required: true },
    role: { type: String, default: "general" }, // e.g. "frontend", "backend", "general"
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    modelAnswer: { type: String, required: true }, // used for similarity scoring
    keywords: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
