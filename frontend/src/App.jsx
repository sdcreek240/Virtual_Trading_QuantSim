import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/StockPage";

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stock/:symbol" element={<StockPage />} />
      </Route>

    </Routes>
  );
}

export default App;