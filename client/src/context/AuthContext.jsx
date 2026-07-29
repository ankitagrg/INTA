import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import * as authService from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("inta_token");
    const storedUser = localStorage.getItem("inta_user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // The axios response interceptor clears storage and fires this event when
  // a silent-refresh attempt fails (refresh token expired/revoked) — drop
  // the in-memory user so ProtectedRoute redirects to /login.
  useEffect(() => {
    const handleSessionExpired = () => setUser(null);
    window.addEventListener("inta:session-expired", handleSessionExpired);
    return () => window.removeEventListener("inta:session-expired", handleSessionExpired);
  }, []);

  // Shared by login/signup/Google — every auth method returns the same
  // { user, token, refreshToken } shape and needs to be persisted/applied
  // identically.
  const persistSession = (data) => {
    localStorage.setItem("inta_token", data.token);
    localStorage.setItem("inta_refresh_token", data.refreshToken);
    localStorage.setItem("inta_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    return persistSession(data);
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await authService.signup(name, email, password);
    return persistSession(data);
  }, []);

  const loginWithGoogle = useCallback(async (credential) => {
    const data = await authService.googleAuth(credential);
    return persistSession(data);
  }, []);

  const logout = useCallback(async () => {
    // Best-effort: revoke the refresh token server-side so it can't be
    // replayed later. Local state is cleared either way — a network failure
    // here shouldn't trap the user in a session they asked to leave.
    try {
      await authService.logout();
    } catch {
      // ignore — proceed with local logout regardless
    }
    localStorage.removeItem("inta_token");
    localStorage.removeItem("inta_refresh_token");
    localStorage.removeItem("inta_user");
    setUser(null);
  }, []);

  // Without this, every AuthProvider render (including ones triggered by
  // state unrelated to auth) creates a brand-new context value object,
  // forcing every consumer of useAuth() to re-render even when user/loading
  // haven't actually changed.
  const value = useMemo(
    () => ({ user, loading, login, signup, loginWithGoogle, logout }),
    [user, loading, login, signup, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
