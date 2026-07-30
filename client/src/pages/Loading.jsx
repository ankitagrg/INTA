import Spinner from "../components/Spinner.jsx";
import BrandIcon from "../components/BrandIcon.jsx";

export default function Loading({ message = "Loading..." }) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center gap-4 font-sans"
      role="status"
      aria-live="polite"
    >
      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.08)] border border-slate-100 dark:border-slate-700">
        <BrandIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <Spinner size="md" className="text-blue-600 dark:text-blue-400" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}
