const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: "A valid email is required" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (typeof password !== "string" || !password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  next();
};

const validateRefreshToken = (req, res, next) => {
  const { refreshToken } = req.body;

  if (typeof refreshToken !== "string" || !refreshToken.trim()) {
    return res.status(400).json({ success: false, message: "refreshToken is required" });
  }

  next();
};

const validateGoogleAuth = (req, res, next) => {
  const { credential } = req.body;

  if (typeof credential !== "string" || !credential.trim()) {
    return res.status(400).json({ success: false, message: "credential is required" });
  }

  next();
};

module.exports = { validateSignup, validateLogin, validateRefreshToken, validateGoogleAuth };
