require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { sendSuccess } = require("./utils/apiResponse");

if (!process.env.JWT_SECRET) {
  console.error("Missing required env var: JWT_SECRET");
  process.exit(1);
}

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  sendSuccess(res, 200, "INTA server is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

// 404 + centralized error handling (must be registered last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`INTA server running on port ${PORT}`));
});
