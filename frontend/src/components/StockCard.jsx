import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { usePortfolio } from "../context/PortfolioContext";

function StockCard({ stock }) {
  const { buyStock, sellStock } = usePortfolio();

  const [prevPrice, setPrevPrice] = useState(stock.price);
  const [flash, setFlash] = useState("");

  // ⭐ WATCHLIST
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const isWatched = watchlist.includes(stock.symbol);

  function toggleWatchlist(e) {
    e.preventDefault(); // IMPORTANT: prevents Link navigation

    let updated;

    if (isWatched) {
      updated = watchlist.filter((s) => s !== stock.symbol);
    } else {
      updated = [...watchlist, stock.symbol];
    }

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  useEffect(() => {
    if (stock.price > prevPrice) setFlash("up");
    else if (stock.price < prevPrice) setFlash("down");

    setPrevPrice(stock.price);

    const t = setTimeout(() => setFlash(""), 400);
    return () => clearTimeout(t);
  }, [stock.price]);

  const isPositive = stock.change >= 0;

  return (
    <Link
      to={`/stock/${stock.symbol}`}
      className={`
        glass-card p-5 rounded-2xl cursor-pointer

        bg-white/5 backdrop-blur-md
        border border-white/10

        transition-all duration-200
        hover:scale-[1.03] 
        hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)]

        group

        ${flash === "up" ? "shadow-[0_0_25px_rgba(34,211,238,0.5)]" : ""}
        ${flash === "down" ? "shadow-[0_0_25px_rgba(236,72,153,0.5)]" : ""}
      `}
    >

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-lg font-bold">
            {stock.symbol}
          </h3>
          <p className="text-gray-400 text-sm">
            {stock.name}
          </p>
        </div>

        {/* ⭐ WATCHLIST BUTTON */}
        <button
          onClick={toggleWatchlist}
          className={`
            text-xl transition
            hover:scale-110
            ${isWatched ? "text-yellow-400" : "text-gray-500"}
          `}
        >
          ★
        </button>

      </div>

      {/* PRICE */}
      <p className="text-2xl font-bold mt-3">
        ${stock.price.toFixed(2)}
      </p>

      {/* CHANGE */}
      <p className={isPositive ? "text-cyan-400" : "text-pink-500"}>
        {isPositive ? "+" : ""}
        {stock.change}%
      </p>

      {/* MINI CHART */}
      <div className="h-16 mt-3 opacity-80 group-hover:opacity-100 transition">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={(stock.history || []).map((p) => ({
              price: p,
            }))}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#22d3ee" : "#ec4899"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TRADE BUTTONS */}
      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition">

        <button
          onClick={(e) => {
            e.preventDefault();
            buyStock(stock.symbol, stock.price);
          }}
          className="flex-1 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
        >
          Buy
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            sellStock(stock.symbol, stock.price);
          }}
          className="flex-1 py-1 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30"
        >
          Sell
        </button>

      </div>

    </Link>
  );
}

export default StockCard;