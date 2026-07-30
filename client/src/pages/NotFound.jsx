import { Link } from "react-router-dom";
import BrandIcon from "../components/BrandIcon.jsx";
import Button from "../components/Button.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center px-4 text-center font-sans">
      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.08)] border border-slate-100 dark:border-slate-700 mb-6">
        <BrandIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">404</p>
      <h1 className="text-3xl font-extrabold text-[#0e1628] dark:text-white tracking-tight mb-3">
        Page not found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </div>
  );
}
