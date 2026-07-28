import BrandIcon from "../components/BrandIcon.jsx";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] flex flex-col items-center justify-between py-10 px-4 font-sans selection:bg-violet-100 selection:text-violet-900">
      {/* Top Brand Header */}
      <div className="flex flex-col items-center space-y-3 mt-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.08)] border border-slate-100">
          <BrandIcon className="w-6 h-6 text-blue-600" plus />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">INTA</span>

        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-bold text-[#0e1628] tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  );
}
