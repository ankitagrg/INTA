
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import BrandIcon from "./BrandIcon.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function AppNav({ onLogoClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (onLogoClick) onLogoClick();
    else navigate("/session");
  };

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-lg"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.2)]">
            <BrandIcon />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">INTA</span>
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/dashboard"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition hidden sm:inline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
          >
            Dashboard
          </Link>
          <Link
            to="/session"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition hidden sm:inline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
          >
            Interview
          </Link>
          <Link
            to="/profile-setup"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition hidden sm:inline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
          >
            Profile
          </Link>
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700"
              aria-hidden="true"
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
              {user?.name}
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
