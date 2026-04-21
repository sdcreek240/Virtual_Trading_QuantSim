import { useEffect, useState } from "react";
import { stocks as initialStocks, simulatePrice } from "../data/stocks";
import StockCard from "../components/StockCard";
import { usePortfolio } from "../context/PortfolioContext";

export default function Dashboard() {
  const [data, setData] = useState(initialStocks || []);
  const { portfolio = {}, cash = 10000 } = usePortfolio() || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => simulatePrice(prev || []));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const portfolioValue = Object.entries(portfolio).reduce(
    (total, [symbol, amount]) => {
      const stock = data.find((s) => s.symbol === symbol);
      return total + (stock ? stock.price * amount : 0);
    },
    0
  );

  const totalValue = portfolioValue + cash;
  const pnl = totalValue - 10000;
  const isPositive = pnl >= 0;

  const bestStock = data.length
    ? [...data].sort((a, b) => (b.change || 0) - (a.change || 0))[0]
    : null;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Market Dashboard</h2>
        <p className="text-gray-400 text-sm">
          Real-time simulated trading environment
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="glass-card p-5">
          <p className="text-gray-400 text-sm">Total Portfolio</p>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </div>

        <div className="glass-card p-5">
          <p className="text-gray-400 text-sm">PnL</p>
          <p className={`text-2xl font-bold ${isPositive ? "text-cyan-400" : "text-pink-500"}`}>
            {isPositive ? "+" : ""}${pnl.toFixed(2)}
          </p>
        </div>

        <div className="glass-card p-5">
          <p className="text-gray-400 text-sm">Cash</p>
          <p className="text-2xl font-bold">${cash.toFixed(2)}</p>
        </div>

      </div>

      {/* TOP STOCK */}
      {bestStock && (
        <div className="glass-card p-5">
          <p className="text-gray-400 text-sm">Top Performer</p>
          <p className="text-xl font-bold">
            {bestStock.symbol} — {bestStock.name}
          </p>
          <p className="text-cyan-400">
            +{bestStock.change}%
          </p>
        </div>
      )}

      {/* STOCK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>

    </div>
  );
}