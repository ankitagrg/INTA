const AppError = require("../utils/AppError");

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

// Must keep all 4 params (err, req, res, next) for Express to treat this as
// an error-handling middleware, even though `next` is unused.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Only expose the message for expected/operational errors (bad input, not
  // found, unauthorized, etc). Unexpected errors are logged server-side and
  // returned to the client as a generic message so internals never leak.
  if (!err.isOperational) {
    console.error(err);
  }
  const message = err.isOperational ? err.message : "Something went wrong";

  res.status(statusCode).json({ success: false, message });
};

module.exports = { notFound, errorHandler };
