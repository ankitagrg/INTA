import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Session from "./pages/Session.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Results from "./pages/Results.jsx";
import CareerProfileSetup from "./pages/CareerProfileSetup.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <CareerProfileSetup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/session"
        element={
          <ProtectedRoute>
            <Session />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results/:sessionId"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
