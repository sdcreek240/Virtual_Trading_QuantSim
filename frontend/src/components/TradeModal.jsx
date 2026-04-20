import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function TradeModal({ open, onClose, stock }) {
  const [amount, setAmount] = useState("");
  const { buyStock, sellStock } = usePortfolio();

  if (!open || !stock) return null;

  function handleBuy() {
    buyStock(stock, amount);
    onClose();
  }

  function handleSell() {
    sellStock(stock, amount);
    onClose();
  }

  return (
    <div className="
      fixed inset-0 bg-black/60
      flex items-center justify-center
      z-50
    ">

      <div className="
        bg-white/10 backdrop-blur-xl
        border border-white/20
        p-6 rounded-2xl w-96
      ">

        <h2 className="text-xl font-bold mb-4">
          Trade {stock.symbol}
        </h2>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="
            w-full p-2 mb-4 rounded-lg
            bg-black/30 border border-white/10
          "
        />

        <div className="flex gap-3">

          <button
            onClick={handleBuy}
            className="flex-1 py-2 rounded-lg bg-cyan-500"
          >
            Buy
          </button>

          <button
            onClick={handleSell}
            className="flex-1 py-2 rounded-lg bg-pink-500"
          >
            Sell
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 text-sm"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default TradeModal;