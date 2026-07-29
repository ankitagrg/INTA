import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/toast.js";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(name, email, password);
      notify.success("Account created — let's get started!");
      navigate("/session");
    } catch (err) {
      notify.apiError(err, "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    try {
      await loginWithGoogle(credential);
      notify.success("Welcome to INTA!");
      navigate("/session");
    } catch (err) {
      notify.apiError(err, "Google sign-in failed. Please try again.");
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start practicing interviews today">
      {/* Main Card */}
      <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 dark:border-slate-800 my-8">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <Input
            id="signup-name"
            label="Full name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            id="signup-email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space-y-2">
            <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={6}
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

          <Button type="submit" loading={loading} className="w-full py-4 mt-2">
            {loading ? "Creating..." : "Create Account"}
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
              OR JOIN WITH
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex items-center justify-center">
          <GoogleSignInButton onSuccess={handleGoogleSuccess} type="standard" />
        </div>
      </div>

      {/* Footer / Switch link */}
      <div className="flex flex-col items-center space-y-8 mb-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7c3aed] dark:text-violet-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>

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
