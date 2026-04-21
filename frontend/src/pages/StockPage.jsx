import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { stocks } from "../data/stocks";
import { usePortfolio } from "../context/PortfolioContext";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function StockPage() {
  const { symbol } = useParams();
  const { buyStock, sellStock } = usePortfolio();

  const stock = stocks.find((s) => s.symbol === symbol);

  const [price, setPrice] = useState(stock?.price || 0);
  const [qty, setQty] = useState(1);
  const [watchlist, setWatchlist] = useState([]);

  const [orderType, setOrderType] = useState("buy");
  const [showConfirm, setShowConfirm] = useState(false);

  // 📊 chart history
  const [history, setHistory] = useState(
    stock?.history?.map((p) => ({ price: p })) || []
  );

  // load watchlist
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const isWatched = watchlist.includes(symbol);

  function toggleWatchlist() {
    let updated;

    if (isWatched) {
      updated = watchlist.filter((s) => s !== symbol);
    } else {
      updated = [...watchlist, symbol];
    }

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  // 📈 live price + chart updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const change = (Math.random() - 0.5) * 1.5;
        const newPrice = Math.max(1, prev + change);

        setHistory((prevHistory) => {
          const updated = [...prevHistory, { price: newPrice }];
          return updated.slice(-40); // keep chart clean
        });

        return newPrice;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  if (!stock) {
    return (
      <div className="p-6 text-white">
        Stock not found
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-3xl font-bold">
            {stock.symbol}
          </h1>
          <p className="text-gray-400">
            {stock.name}
          </p>
        </div>

        {/* WATCHLIST */}
        <button
          onClick={toggleWatchlist}
          className={`
            text-2xl transition hover:scale-110
            ${isWatched ? "text-yellow-400" : "text-gray-500"}
          `}
        >
          ★
        </button>

      </div>

      {/* PRICE */}
      <div className="flex items-end gap-4">
        <h2 className="text-4xl font-bold">
          ${price.toFixed(2)}
        </h2>

        <p className={isPositive ? "text-cyan-400" : "text-pink-500"}>
          {isPositive ? "+" : ""}
          {stock.change}%
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* 📊 CHART */}
        <div className="lg:col-span-2 glass-card p-5 h-[400px]">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>

              <XAxis hide />
              <YAxis domain={["auto", "auto"]} hide />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.7)",
                  border: "none",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* 💰 TRADE PANEL */}
        <div className="glass-card p-5 space-y-4">

          <h2 className="text-lg font-bold">Trade</h2>

          {/* BUY / SELL */}
          <div className="flex gap-2">

            <button
              onClick={() => setOrderType("buy")}
              className={`flex-1 py-1 rounded-lg transition
                ${orderType === "buy"
                  ? "bg-cyan-500/30 text-cyan-300"
                  : "bg-white/5 text-gray-400"
                }`}
            >
              Buy
            </button>

            <button
              onClick={() => setOrderType("sell")}
              className={`flex-1 py-1 rounded-lg transition
                ${orderType === "sell"
                  ? "bg-pink-500/30 text-pink-300"
                  : "bg-white/5 text-gray-400"
                }`}
            >
              Sell
            </button>

          </div>

          {/* QUANTITY */}
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="
              w-full p-2 rounded-lg
              bg-black/30 border border-white/10
              outline-none
            "
          />

          {/* ORDER PREVIEW */}
          <div className="text-sm text-gray-400">
            Order Preview: <br />
            {orderType.toUpperCase()} {qty} {symbol} @ ${price.toFixed(2)}
            <br />
            <span className="text-white font-bold">
              Total: ${(price * qty).toFixed(2)}
            </span>
          </div>

          {/* REVIEW */}
          <button
            onClick={() => setShowConfirm(true)}
            className={`
              w-full py-2 rounded-lg transition
              ${orderType === "buy"
                ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                : "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30"
              }
            `}
          >
            Review Order
          </button>

          {/* CONFIRM MODAL */}
          {showConfirm && (
            <div className="mt-4 p-4 rounded-lg bg-black/40 border border-white/10 space-y-3">

              <p className="font-bold">Confirm Order</p>

              <p className="text-sm text-gray-400">
                {orderType.toUpperCase()} {qty} {symbol}
              </p>

              <p className="text-white font-bold">
                ${(price * qty).toFixed(2)}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-1 rounded-lg bg-white/10 text-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (orderType === "buy") {
                      buyStock(symbol, price, qty);
                    } else {
                      sellStock(symbol, price, qty);
                    }

                    setShowConfirm(false);
                  }}
                  className={`
                    flex-1 py-1 rounded-lg
                    ${orderType === "buy"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-pink-500/20 text-pink-400"
                    }
                  `}
                >
                  Confirm
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}