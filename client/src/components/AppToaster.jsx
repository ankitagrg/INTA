import { Toaster } from "react-hot-toast";
import { useTheme } from "../hooks/useTheme.js";

export default function AppToaster() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? "#1e293b" : "#ffffff",
          color: isDark ? "#f1f5f9" : "#0e1628",
          border: `1px solid ${isDark ? "#334155" : "#f1f5f9"}`,
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: 600,
          padding: "12px 16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        },
        success: { iconTheme: { primary: "#059669", secondary: isDark ? "#1e293b" : "#ffffff" } },
        error: { iconTheme: { primary: "#dc2626", secondary: isDark ? "#1e293b" : "#ffffff" } },
      }}
    />
  );
}
