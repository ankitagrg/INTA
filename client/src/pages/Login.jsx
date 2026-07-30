import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/toast.js";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      notify.success("Welcome back!");
      navigate("/session");
    } catch (err) {
      notify.apiError(err, "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    try {
      await loginWithGoogle(credential);
      notify.success("Welcome back!");
      navigate("/session");
    } catch (err) {
      notify.apiError(err, "Google sign-in failed. Please try again.");
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Please enter your details">
      {/* Main Card */}
      <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 dark:border-slate-800 my-8">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <Input
            id="login-email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="login-password" className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                Password
              </label>
              <Link to="#" className="text-xs text-[#7c3aed] dark:text-violet-400 hover:underline font-semibold">
                Forgot?
              </Link>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f5f7fc] dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/30 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815 3 3m-3-3-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-violet-500/20 dark:bg-slate-800"
            />
            <label htmlFor="remember" className="text-sm font-medium text-slate-500 dark:text-slate-400 select-none">
              Remember me
            </label>
          </div>

          <Button type="submit" loading={loading} className="w-full py-4">
            {loading ? "Signing in..." : "Sign in"}
            {!loading && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 mt-0.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex items-center justify-center">
          <GoogleSignInButton onSuccess={handleGoogleSuccess} type="standard" />
        </div>
      </div>

      {/* Footer / Switch link */}
      <div className="flex flex-col items-center space-y-6 mb-4 w-full">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          New to INTA?{" "}
          <Link to="/signup" className="text-[#7c3aed] dark:text-violet-400 font-semibold hover:underline">
            Create account
          </Link>
        </p>

        {/* Admin access shield */}
        <button
          type="button"
          className="flex items-center space-x-2 text-[10px] font-bold tracking-wider text-slate-400/80 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          <span>Admin Access</span>
        </button>

        {/* Tiny Legal Footer */}
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          <Link to="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition">Privacy</Link>
          <span>•</span>
          <Link to="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition">Terms</Link>
          <span>•</span>
          <span>© 2026</span>
        </div>
      </div>
    </AuthLayout>
  );
}