import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/StockPage";
import Auth from "./pages/Auth";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* AUTH PAGE (NO SIDEBAR) */}
      <Route path="/auth" element={<Auth />} />

      {/* APP PAGES (WITH SIDEBAR) */}
      <Route
        path="/"
        element={
          user ? (
            <MainLayout />
          ) : (
            <Navigate to="/auth" />
          )
        }
      >

        <Route index element={<Dashboard />} />
        <Route path="stock/:symbol" element={<StockPage />} />

      </Route>

    </Routes>
  );
}

export default App;