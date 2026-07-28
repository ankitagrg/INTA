const mongoose = require("mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true, // also creates a unique index
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, "Please provide a valid email address"],
    },
    // Excluded from query results by default; queries that need it (e.g. login)
    // must explicitly opt in with .select("+password").
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// e.g. "Ankita Gurung" -> "AG", for avatar/initials display
userSchema.virtual("initials").get(function () {
  if (!this.name) return "";
  return this.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
});

module.exports = mongoose.model("User", userSchema);
