const express = require("express");
const { signup, login, googleAuth, refresh, logout, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/rateLimiter");
const {
  validateSignup,
  validateLogin,
  validateRefreshToken,
  validateGoogleAuth,
} = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", loginLimiter, validateLogin, login);
router.post("/google", loginLimiter, validateGoogleAuth, googleAuth);
router.post("/refresh", validateRefreshToken, refresh);
router.post("/logout", protect, logout);
router.get("/profile", protect, getProfile);

module.exports = router;
