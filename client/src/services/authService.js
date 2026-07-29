import api from "../api/axiosClient";

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function signup(name, email, password) {
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data;
}

export async function googleAuth(credential) {
  const { data } = await api.post("/auth/google", { credential });
  return data;
}

export async function refreshSession(refreshToken) {
  const { data } = await api.post("/auth/refresh", { refreshToken });
  return data;
}

export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data;
}
