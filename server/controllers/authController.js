const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});

// Refresh tokens are already high-entropy random JWTs, not low-entropy
// human-chosen secrets, so bcrypt's slow salted hashing isn't the right
// tool — and is actively wrong here: bcrypt silently truncates input at 72
// bytes, and two refresh tokens for the same user share an identical
// header + `id`-field prefix well past 72 bytes before their unique `jti`
// even starts, so bcrypt.compare would treat any refresh token for that
// user as a match regardless of rotation. SHA-256 has no such limit.
const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

// Issues a fresh access/refresh pair and persists a hash of the refresh
// token on the user, so a rotated-out or revoked (logged-out) refresh
// token stops working even though it's still a validly-signed JWT.
const issueTokens = async (user) => {
  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = hashToken(refreshToken);
  await user.save();
  return { token, refreshToken };
};

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword, authProvider: "local" });

  const { token, refreshToken } = await issueTokens(user);

  sendSuccess(res, 201, "Account created successfully", { user: publicUser(user), token, refreshToken });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.password) {
    throw new AppError("This account uses Google Sign-In. Please continue with Google instead.", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const { token, refreshToken } = await issueTokens(user);

  sendSuccess(res, 200, "Logged in successfully", { user: publicUser(user), token, refreshToken });
});

// POST /api/auth/google — verify a Google ID token, find-or-create the
// matching user, and issue this app's own tokens (same shape as
// login/signup, so the frontend handles both identically).
const googleAuth = asyncHandler(async (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new AppError("Google Sign-In is not configured on this server yet", 501);
  }

  const { credential } = req.body;

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw new AppError("Invalid Google credential", 401);
  }

  const { sub: googleId, email, name, picture } = payload;
  if (!email) {
    throw new AppError("Google account did not provide an email address", 400);
  }

  let user = await User.findOne({ googleId });

  if (!user) {
    // No account linked to this Google ID yet — match by email so a user
    // who originally signed up with a password can also continue with
    // Google later, instead of ending up with two separate accounts.
    user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      if (!user.avatar) user.avatar = picture;
    } else {
      user = new User({
        name,
        email,
        authProvider: "google",
        googleId,
        avatar: picture,
      });
    }
    await user.save();
  }

  const { token, refreshToken } = await issueTokens(user);

  sendSuccess(res, 200, "Logged in successfully", { user: publicUser(user), token, refreshToken });
});

// POST /api/auth/refresh — exchange a valid refresh token for a new access
// token, rotating the refresh token so the old one can't be replayed.
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || !user.refreshToken) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  if (user.refreshToken !== hashToken(refreshToken)) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const { token, refreshToken: newRefreshToken } = await issueTokens(user);

  sendSuccess(res, 200, "Token refreshed", { token, refreshToken: newRefreshToken });
});

// POST /api/auth/logout — revoke the stored refresh token so it can no
// longer be exchanged for new access tokens.
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
  sendSuccess(res, 200, "Logged out successfully");
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  sendSuccess(res, 200, "Profile fetched successfully", { user });
});

module.exports = { signup, login, googleAuth, refresh, logout, getProfile };
