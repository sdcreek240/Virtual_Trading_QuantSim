import { useNavigate } from "react-router-dom";
import StockSparkline from "./StockSparkline";

function StockCard({ stock }) {
  const navigate = useNavigate();

  const isPositive = stock.change >= 0;

  return (
    <div
      onClick={() => navigate(`/stock/${stock.symbol}`)}
      className={`
        relative p-5 rounded-2xl

        bg-white/5 backdrop-blur-md
        border border-white/10

        cursor-pointer

        transition-all duration-300
        hover:scale-[1.05]
        hover:border-indigo-400/40
        hover:shadow-[0_0_45px_rgba(99,102,241,0.35)]

        ${isPositive ? "animate-pulse-green" : "animate-pulse-red"}
      `}
    >
      {/* glowing orb background */}
      <div className="
        absolute -top-10 -right-10 w-32 h-32
        bg-indigo-500/20 blur-3xl rounded-full
      " />

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-start">

        <div>
          <h3 className="font-semibold text-lg">
            {stock.name}
          </h3>

          <p className="text-gray-400 text-sm">
            {stock.symbol}
          </p>
        </div>

        <div
          className={`font-bold text-sm ${
            isPositive ? "text-cyan-400" : "text-pink-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {stock.change}%
        </div>

      </div>

      {/* PRICE + CHART */}
      <div className="relative z-10 mt-5 flex justify-between items-end">

        <div>
          <p className="
            text-2xl font-bold tabular-nums
            transition-all duration-300
          ">
            ${stock.price}
          </p>

          <p className="text-gray-400 text-xs">
            Live market price
          </p>
        </div>

        <StockSparkline
          data={stock.history}
          isPositive={isPositive}
        />

      </div>

    </div>
  );
}

export default StockCard;