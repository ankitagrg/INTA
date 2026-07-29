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
    // Optional: only required for local (email/password) accounts — a
    // Google account never sets one. Excluded from query results by
    // default; queries that need it (e.g. local login) must explicitly
    // opt in with .select("+password").
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      select: false,
    },
    // How this account authenticates. Google accounts are matched by
    // email on sign-in — if a local account with that email already
    // exists, googleId gets linked onto it rather than creating a
    // duplicate user.
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, unique: true, sparse: true, select: false },
    avatar: { type: String, default: null }, // profile picture URL, from Google when present
    role: { type: String, enum: ["student", "admin"], default: "student" },
    // Hash of the current valid refresh token, so a rotated-out or revoked
    // (logged-out) refresh token stops working even though it's still a
    // validly-signed JWT. Excluded by default like password.
    refreshToken: { type: String, select: false, default: null },
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
