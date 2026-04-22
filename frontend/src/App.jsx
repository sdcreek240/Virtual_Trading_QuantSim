import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";
import StockPage from "./pages/StockPage";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user } = useAuth();

  // prevent crash if context not ready
  if (user === undefined) return null;

  return (
    <Routes>

      {/* 🔓 PUBLIC ROUTES */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />

      {/* 🔐 PROTECTED ROUTES */}
      <Route
        element={user ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stock/:symbol" element={<StockPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;