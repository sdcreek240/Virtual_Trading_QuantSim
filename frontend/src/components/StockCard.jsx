import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import { usePortfolio } from "../context/PortfolioContext";
import { useToast } from "../context/ToastContext";

function StockCard({ stock }) {
  const { buyStock, sellStock } = usePortfolio();
  const { showToast } = useToast();

  const [prevPrice, setPrevPrice] = useState(stock.price);
  const [flash, setFlash] = useState("");

  // ⭐ WATCHLIST STATE
  const [watchlist, setWatchlist] = useState([]);

  // 🔥 TRADE MODAL STATE
  const [openTrade, setOpenTrade] = useState(false);
  const [orderType, setOrderType] = useState("buy");
  const [qty, setQty] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  // LOAD WATCHLIST
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const isWatched = watchlist.includes(stock.symbol);

  function toggleWatchlist(e) {
    e.stopPropagation(); // 🚨 prevent card click navigation

    let updated;

    if (isWatched) {
      updated = watchlist.filter((s) => s !== stock.symbol);
      showToast(`${stock.symbol} removed from watchlist`, "error");
    } else {
      updated = [...watchlist, stock.symbol];
      showToast(`${stock.symbol} added to watchlist`, "success");
    }

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  // PRICE FLASH
  useEffect(() => {
    if (stock.price > prevPrice) setFlash("up");
    else if (stock.price < prevPrice) setFlash("down");

    setPrevPrice(stock.price);

    const t = setTimeout(() => setFlash(""), 400);
    return () => clearTimeout(t);
  }, [stock.price]);

  const isPositive = stock.change >= 0;

  return (
    <>
      {/* CARD */}
      <div
        className={`
          relative
          p-5 rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          transition-all duration-200
          hover:scale-[1.03]
          cursor-pointer group
          ${flash === "up" ? "shadow-[0_0_25px_rgba(34,211,238,0.5)]" : ""}
          ${flash === "down" ? "shadow-[0_0_25px_rgba(236,72,153,0.5)]" : ""}
        `}
      >

        {/* ⭐ STAR */}
        <button
          onClick={toggleWatchlist}
          className={`
            absolute top-3 right-3 text-lg
            transition hover:scale-125
            ${isWatched ? "text-yellow-400" : "text-gray-500"}
          `}
        >
          ★
        </button>

        {/* CLICKABLE AREA */}
        <Link to={`/stock/${stock.symbol}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{stock.symbol}</h3>
              <p className="text-gray-400 text-sm">{stock.name}</p>
            </div>

            <p className={`text-sm font-semibold ${isPositive ? "text-cyan-400" : "text-pink-500"}`}>
              {isPositive ? "+" : ""}
              {stock.change}%
            </p>
          </div>

          <p className="text-2xl font-bold mt-3">
            ${stock.price.toFixed(2)}
          </p>

          <div className="h-16 mt-3 opacity-80 group-hover:opacity-100 transition">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={(stock.history || []).map((p) => ({ price: p }))}>
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
        </Link>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => {
              setOrderType("buy");
              setOpenTrade(true);
            }}
            className="flex-1 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
          >
            Buy
          </button>

          <button
            onClick={() => {
              setOrderType("sell");
              setOpenTrade(true);
            }}
            className="flex-1 py-1 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition"
          >
            Sell
          </button>
        </div>

      </div>

      {/* 🔥 TRADE MODAL */}
      {openTrade && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="glass-card p-6 w-80 space-y-4">

            <h2 className="text-lg font-bold">
              {orderType.toUpperCase()} {stock.symbol}
            </h2>

            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-black/30 border border-white/10"
            />

            <div className="text-sm text-gray-400">
              {qty} shares @ ${stock.price.toFixed(2)}
              <br />
              <span className="text-white font-bold">
                Total: ${(qty * stock.price).toFixed(2)}
              </span>
            </div>

            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full py-2 rounded-lg bg-white/10"
              >
                Review Order
              </button>
            ) : (
              <div className="space-y-3">

                <p className="text-sm text-gray-400">
                  Confirm {orderType.toUpperCase()} {qty} {stock.symbol}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-1 rounded bg-white/10"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => {
                      if (orderType === "buy") {
                        buyStock(stock.symbol, stock.price, qty);
                        showToast(`Bought ${qty} ${stock.symbol}`, "success");
                      } else {
                        sellStock(stock.symbol, stock.price, qty);
                        showToast(`Sold ${qty} ${stock.symbol}`, "error");
                      }

                      setOpenTrade(false);
                      setShowConfirm(false);
                      setQty(1);
                    }}
                    className="flex-1 py-1 rounded bg-cyan-500/20 text-cyan-400"
                  >
                    Confirm
                  </button>
                </div>

              </div>
            )}

            <button
              onClick={() => {
                setOpenTrade(false);
                setShowConfirm(false);
              }}
              className="w-full text-sm text-gray-400 mt-2"
            >
              Cancel
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default StockCard;