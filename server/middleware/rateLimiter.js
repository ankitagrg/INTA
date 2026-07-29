const rateLimit = require("express-rate-limit");

// Slows down brute-force credential guessing. express-rate-limit's default
// in-memory store is appropriate for a single-process deployment like this
// one; a multi-instance deployment would need a shared store (e.g. Redis).
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again later." },
});

module.exports = { loginLimiter };
