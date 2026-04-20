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

      {/* HEADER */}
      <div className="
        bg-white/5 backdrop-blur-md
        border border-white/10
        p-6 rounded-2xl
        shadow-[0_0_40px_rgba(99,102,241,0.12)]
      ">

        <h1 className="text-3xl font-bold">
          {stock.name} ({stock.symbol})
        </h1>

        <p className="text-gray-400 mt-2">
          Live market simulation view
        </p>

        <div className="mt-6 flex items-end justify-between">

          <div>
            <p className="text-4xl font-bold">
              ${stock.price}
            </p>

            <p className={isPositive ? "text-cyan-400" : "text-pink-500"}>
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

            bg-gradient-to-r from-cyan-500 to-blue-500
            hover:scale-105 transition-all
          "
        >
          Trade
        </button>

      </div>

      {/* CHART AREA */}
      <div className="
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl h-72
        flex items-center justify-center
        text-gray-400
      ">
        📈 Full Chart Coming Soon
      </div>

      {/* MODAL (SAFE WRAPPED) */}
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