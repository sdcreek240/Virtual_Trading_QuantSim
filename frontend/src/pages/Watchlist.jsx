import { useEffect, useState } from "react";
import { stocks } from "../data/stocks";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate(); // ⭐ NEW

  // load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (symbol) => {
    const updated = watchlist.filter((s) => s !== symbol);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const watchlistStocks = stocks.filter((s) =>
    watchlist.includes(s.symbol)
  );

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Watchlist</h1>
        <p className="text-gray-400 text-sm">
          Track your favourite stocks
        </p>
      </div>

      {/* EMPTY STATE */}
      {watchlistStocks.length === 0 ? (
        <div className="glass-card p-6 text-gray-400">
          No stocks in watchlist yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {watchlistStocks.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => navigate(`/stock/${stock.symbol}`)} // ⭐ NAVIGATION
              className="glass-card p-5 space-y-2 cursor-pointer hover:scale-[1.02] transition"
            >

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-bold">{stock.symbol}</p>
                  <p className="text-sm text-gray-400">
                    {stock.name}
                  </p>
                </div>

                {/* 🛑 STOP CLICK PROPAGATION */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ⭐ prevents card click
                    removeFromWatchlist(stock.symbol);
                  }}
                  className="text-pink-400 text-sm hover:text-pink-300"
                >
                  Remove
                </button>

              </div>

              <p className="text-2xl font-bold">
                ${stock.price.toFixed(2)}
              </p>

              <p
                className={
                  stock.change >= 0
                    ? "text-cyan-400"
                    : "text-pink-500"
                }
              >
                {stock.change}%
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}