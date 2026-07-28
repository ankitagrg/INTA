const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });

  sendSuccess(res, 201, "Account created successfully", {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  sendSuccess(res, 200, "Logged in successfully", {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user),
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id); // password already excluded by schema default
  if (!user) {
    throw new AppError("User not found", 404);
  }
  sendSuccess(res, 200, "Profile fetched successfully", { user });
});

module.exports = { signup, login, getProfile };
