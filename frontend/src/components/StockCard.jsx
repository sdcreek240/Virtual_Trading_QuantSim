import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { usePortfolio } from "../context/PortfolioContext";
import toast from "react-hot-toast";

function StockCard({ stock }) {
  const { buyStock, sellStock } = usePortfolio();

  const [prevPrice, setPrevPrice] = useState(stock.price);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (stock.price > prevPrice) setFlash("up");
    else if (stock.price < prevPrice) setFlash("down");

    setPrevPrice(stock.price);

    const t = setTimeout(() => setFlash(""), 400);
    return () => clearTimeout(t);
  }, [stock.price]);

  const isPositive = stock.change >= 0;

  return (
    <div
      className={`
        glass-card p-5 group cursor-pointer

        ${flash === "up" ? "animate-pulse-green" : ""}
        ${flash === "down" ? "animate-pulse-red" : ""}
      `}
    >

      {/* HEADER */}
      <Link to={`/stock/${stock.symbol}`}>
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">{stock.symbol}</h3>
            <p className="text-gray-400 text-sm">{stock.name}</p>
          </div>

          <p className={isPositive ? "text-cyan-400" : "text-pink-500"}>
            {stock.change}%
          </p>
        </div>

        {/* PRICE */}
        <p className="text-2xl font-bold mt-2">
          ${stock.price.toFixed(2)}
        </p>

        {/* MINI CHART */}
        <div className="h-16 mt-3 opacity-80 group-hover:opacity-100 transition">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={(stock.history || []).map(p => ({ price: p }))}>
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

      {/* TRADE BUTTONS */}
      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition">

        <button
          onClick={() => {
  buyStock(stock.symbol, stock.price);
  toast.success(`Bought ${stock.symbol} @ $${stock.price.toFixed(2)}`);
}}
          className="btn-micro flex-1 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
        >
          Buy
        </button>

        <button
          onClick={() => {
  sellStock(stock.symbol, stock.price);
  toast.error(`Sold ${stock.symbol} @ $${stock.price.toFixed(2)}`);
}}
          className="btn-micro flex-1 py-1 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30"
        >
          Sell
        </button>

      </div>

    </div>
  );
}

export default StockCard;