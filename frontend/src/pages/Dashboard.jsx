import { useEffect, useState } from "react";
import { stocks as initialStocks, simulatePrice } from "../data/stocks";
import StockCard from "../components/StockCard";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [data, setData] = useState(initialStocks);

  const { logout } = useAuth();

  // SAFE: prevents crash if context breaks
  let portfolio = {};
  try {
    const ctx = usePortfolio();
    portfolio = ctx?.portfolio || {};
  } catch (e) {
    portfolio = {};
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => simulatePrice(prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Market Dashboard
        </h2>

        <button
          onClick={logout}
          className="
            text-sm text-gray-400
            hover:text-white transition
          "
        >
          Logout
        </button>

      </div>

      {/* STOCK GRID */}
      <div className="
      grid grid-cols-1 md:grid-cols-3 gap-5
      animate-fade-in
      ">
        {data.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>

      {/* PORTFOLIO PANEL */}
      <div className="
        mt-8 p-4 rounded-xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl
      ">

        <h3 className="font-bold mb-2">
          Portfolio
        </h3>

        {Object.keys(portfolio).length === 0 ? (
          <p className="text-gray-400">
            No holdings yet
          </p>
        ) : (
          Object.entries(portfolio).map(([symbol, amount]) => (
            <p key={symbol} className="text-gray-300">
              {symbol}: {amount}
            </p>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;