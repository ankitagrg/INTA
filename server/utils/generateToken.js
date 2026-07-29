const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// The refresh endpoint exists (POST /api/auth/refresh) and is bug-fixed and
// tested, but the frontend doesn't call it yet — no silent-refresh flow is
// wired up. Until that lands, the access token stays long-lived so users
// aren't forced to re-login every 15 minutes with no recovery path.
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Long-lived — signed with a separate secret so a leaked access-token secret
// alone can't be used to mint new sessions. Only ever exchanged at
// POST /api/auth/refresh, and checked against the hash stored on the user
// so a previously-issued (rotated-out) refresh token stops working.
//
// `jti` is required, not decorative: JWT signing is deterministic for an
// identical payload/secret/second, so two refresh tokens issued for the
// same user within the same second would otherwise be byte-for-byte
// identical — silently defeating rotation (the "old" token would just
// equal the "new" one instead of being rejected).
const generateRefreshToken = (user) =>
  jwt.sign(
    { id: user._id, jti: crypto.randomBytes(16).toString("hex") },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );

module.exports = { generateAccessToken, generateRefreshToken };
