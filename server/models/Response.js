const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "InterviewSession", required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    answerText: { type: String, required: true, trim: true, maxlength: 5000 },
    // Not required: a Response is created first, then linked to its
    // EvaluationResult once evaluation finishes (see sessionController).
    evaluation: { type: mongoose.Schema.Types.ObjectId, ref: "EvaluationResult" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Foreign-key lookups: all responses for a session, or for a question
// (e.g. future "how do candidates answer this question" analytics).
responseSchema.index({ session: 1 });
responseSchema.index({ question: 1 });

responseSchema.virtual("wordCount").get(function () {
  return this.answerText ? this.answerText.trim().split(/\s+/).filter(Boolean).length : 0;
});

module.exports = mongoose.model("Response", responseSchema);
