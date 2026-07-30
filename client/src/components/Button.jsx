import Spinner from "./Spinner.jsx";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm px-6 py-3.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS = {
  primary:
    "bg-[#0e1628] hover:bg-[#1a253c] text-white shadow-[0_4px_10px_rgba(14,22,40,0.08)] focus-visible:outline-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500",
  secondary:
    "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline-blue-500",
  ghost:
    "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-visible:outline-blue-500",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  children,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
