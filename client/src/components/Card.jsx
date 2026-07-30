export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
