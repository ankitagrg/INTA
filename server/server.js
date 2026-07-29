require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { sendSuccess } = require("./utils/apiResponse");

if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.error("Missing required env var: JWT_SECRET and/or JWT_REFRESH_SECRET");
  process.exit(1);
}

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const careerProfileRoutes = require("./routes/careerProfileRoutes");

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" })); // interview answers are capped at 5000 chars; 100kb is generous headroom

// Health check
app.get("/api/health", (req, res) => {
  sendSuccess(res, 200, "INTA server is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/profile", careerProfileRoutes);

// 404 + centralized error handling (must be registered last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`INTA server running on port ${PORT}`));
});
