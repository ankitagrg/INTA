/**
 * Represents an expected, "safe to show the client" error (bad input, not
 * found, unauthorized, etc.), as opposed to an unexpected programming/runtime
 * error. The global error handler uses isOperational to decide whether to
 * expose err.message to the client or hide it behind a generic message.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
