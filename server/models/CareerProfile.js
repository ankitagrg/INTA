const mongoose = require("mongoose");
const {
  POSITIONS,
  EXPERIENCE_LEVELS,
  COMPANY_TYPES,
  DIFFICULTIES,
  LANGUAGES,
} = require("../utils/techStack");

// One profile per user — drives which role/track technical questions are
// pulled from (see utils/techStack.derivePrimaryRole), and is stored in
// full even where fields don't yet affect question selection (companyType,
// language), so the data is captured now and can be wired in later without
// another migration.
const careerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    position: { type: String, enum: POSITIONS, required: true },
    experienceLevel: { type: String, enum: EXPERIENCE_LEVELS, required: true },
    techStack: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Select at least one technology",
      },
    },
    companyType: { type: String, enum: COMPANY_TYPES, default: "any" },
    difficulty: { type: String, enum: DIFFICULTIES, default: "adaptive" },
    language: { type: String, enum: LANGUAGES, default: "english" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerProfile", careerProfileSchema);
