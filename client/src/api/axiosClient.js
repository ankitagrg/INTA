import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("inta_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints that should never trigger a silent-refresh retry: a 401
// from these means "bad credentials" or "refresh token itself is dead", not
// "access token expired mid-session".
const AUTH_ENDPOINTS = ["/auth/login", "/auth/signup", "/auth/google", "/auth/refresh"];

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

const subscribeToRefresh = (cb) => refreshSubscribers.push(cb);

const clearSession = () => {
  localStorage.removeItem("inta_token");
  localStorage.removeItem("inta_refresh_token");
  localStorage.removeItem("inta_user");
  window.dispatchEvent(new Event("inta:session-expired"));
};

// On a 401 from an expired access token, transparently exchange the stored
// refresh token for a new pair and retry the original request once — so a
// 7-day session doesn't force a re-login mid-use. Concurrent 401s while a
// refresh is already in flight queue behind the single in-flight refresh
// call instead of each firing their own (which would race the backend's
// refresh-token rotation and fail all but one of them).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config: originalRequest, response } = error;

    if (
      response?.status !== 401 ||
      originalRequest._retry ||
      AUTH_ENDPOINTS.some((url) => originalRequest.url?.includes(url))
    ) {
      return Promise.reject(error);
    }

    const storedRefreshToken = localStorage.getItem("inta_refresh_token");
    if (!storedRefreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeToRefresh((newToken) => {
          if (!newToken) return reject(error);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;
    return api
      .post("/auth/refresh", { refreshToken: storedRefreshToken })
      .then(({ data }) => {
        localStorage.setItem("inta_token", data.token);
        localStorage.setItem("inta_refresh_token", data.refreshToken);
        onRefreshed(data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      })
      .catch((refreshError) => {
        onRefreshed(null);
        clearSession();
        return Promise.reject(refreshError);
      })
      .finally(() => {
        isRefreshing = false;
      });
  }
);

export default api;
