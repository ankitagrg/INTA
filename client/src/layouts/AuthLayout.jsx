import BrandIcon from "../components/BrandIcon.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-between py-10 px-4 font-sans selection:bg-violet-100 selection:text-violet-900 relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      {/* Top Brand Header */}
      <div className="flex flex-col items-center space-y-3 mt-4">
        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.08)] border border-slate-100 dark:border-slate-700">
          <BrandIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" plus />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">INTA</span>

        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-bold text-[#0e1628] dark:text-white tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  );
}
