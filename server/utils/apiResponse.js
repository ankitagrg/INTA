/**
 * Standardized success envelope: every response body gets `success` and
 * `message`, with the endpoint's actual payload spread at the top level
 * (rather than nested under a `data` key) so existing response shapes
 * (e.g. { user, token }) stay unchanged for consumers.
 */
const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({ success: true, message, ...data });
};

module.exports = { sendSuccess };
