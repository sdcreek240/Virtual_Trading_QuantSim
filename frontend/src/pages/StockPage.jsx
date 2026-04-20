import { useParams } from "react-router-dom";
import { useState } from "react";
import { stocks } from "../data/stocks";
import StockSparkline from "../components/StockSparkline";
import TradeModal from "../components/TradeModal";

function StockPage() {
  const { symbol } = useParams();
  const [open, setOpen] = useState(false);

  const stock = stocks.find((s) => s.symbol === symbol);

  if (!stock) {
    return <div className="p-6 text-white">Stock not found</div>;
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="p-6 space-y-6">

      {/* HERO CARD */}
      <div className="
        relative overflow-hidden
        p-6 rounded-2xl

        bg-white/5 backdrop-blur-md
        border border-white/10

        shadow-[0_0_50px_rgba(99,102,241,0.15)]
      ">

        <div className="
          absolute -top-20 -right-20 w-64 h-64
          bg-cyan-500/20 blur-3xl rounded-full
        " />

        <h1 className="text-3xl font-bold">
          {stock.name} ({stock.symbol})
        </h1>

        <p className="text-gray-400 mt-2">
          Live simulated trading feed
        </p>

        <div className="mt-6 flex justify-between items-end">

          <div>
            <p className="text-4xl font-bold tabular-nums">
              ${stock.price}
            </p>

            <p className={`mt-1 font-semibold ${
              isPositive ? "text-cyan-400" : "text-pink-500"
            }`}>
              {isPositive ? "+" : ""}{stock.change}%
            </p>
          </div>

          <StockSparkline
            data={stock.history}
            isPositive={isPositive}
          />

        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            mt-6 px-6 py-2 rounded-lg font-semibold

            bg-gradient-to-r from-cyan-500 to-indigo-500
            hover:scale-105 transition-all

            shadow-[0_0_25px_rgba(34,211,238,0.25)]
          "
        >
          Trade
        </button>

      </div>

      {/* CHART AREA */}
      <div className="
        h-72 rounded-2xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl

        flex items-center justify-center
        text-gray-400
      ">
        📊 Advanced Chart Coming Soon
      </div>

      {stock && (
        <TradeModal
          open={open}
          onClose={() => setOpen(false)}
          stock={stock}
        />
      )}

    </div>
  );
}

export default StockPage;