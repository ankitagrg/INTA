import { useId } from "react";

export default function Input({ label, error, type = "text", className = "", id, ...props }) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full bg-[#f5f7fc] dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/30 transition-all disabled:opacity-75 ${className}`}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
