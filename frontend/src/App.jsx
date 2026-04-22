import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";
import StockPage from "./pages/StockPage"; // ⭐ ADDED

import Login from "./pages/Login";

function App() {
  const { user } = useAuth();

  // 🚨 prevent crash if context not ready
  if (user === undefined) return null;

  // 🔐 AUTH GATE
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>

      {/* 🔐 PROTECTED APP */}
      <Route element={<MainLayout />}>

        {/* MAIN ROUTES */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />

        {/* ⭐ STOCK DETAIL PAGE (FIXED) */}
        <Route path="/stock/:symbol" element={<StockPage />} />

      </Route>

      {/* fallback */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;