const express = require("express");
const { signup, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateSignup, validateLogin } = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/profile", protect, getProfile);

module.exports = router;
