import toast from "react-hot-toast";

// The same "does the backend's AppError message exist? fall back if not"
// check every API catch block in this app needs.
export const getErrorMessage = (err, fallback) => err.response?.data?.message || fallback;

export const notify = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  apiError: (err, fallback) => toast.error(getErrorMessage(err, fallback)),
};
