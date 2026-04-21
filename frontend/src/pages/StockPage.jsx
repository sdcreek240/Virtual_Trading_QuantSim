import { useParams } from "react-router-dom";
import { stocks } from "../data/stocks";
import { usePortfolio } from "../context/PortfolioContext";

function StockPage() {
  const { symbol } = useParams();
  const { buyStock, sellStock, portfolio } = usePortfolio();

  const stock = stocks.find((s) => s.symbol === symbol);

  if (!stock) {
    return (
      <div className="p-6">
        <h2>Stock not found</h2>
      </div>
    );
  }

  const isPositive = stock.change >= 0;
  const ownedAmount = portfolio[stock.symbol] || 0;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">
          {stock.name} ({stock.symbol})
        </h2>
        <p className="text-gray-400 mt-1">
          Real-time market simulation
        </p>
      </div>

      {/* PRICE CARD */}
      <div className="
        bg-white/5 backdrop-blur-md
        p-6 rounded-2xl
        border border-white/10

        shadow-[0_0_30px_rgba(99,102,241,0.2)]
        transition-all duration-300
        hover:scale-[1.02]
      ">
        <p className="text-4xl font-bold">
          ${stock.price.toFixed(2)}
        </p>

        <p
          className={`
            mt-2 text-lg font-semibold
            ${isPositive ? "text-cyan-400" : "text-pink-500"}
          `}
        >
          {isPositive ? "+" : ""}
          {stock.change}%
        </p>

        <p className="text-gray-400 mt-2 text-sm">
          You own: {ownedAmount} shares
        </p>
      </div>

      {/* CHART PLACEHOLDER */}
      <div className="
        bg-white/5 backdrop-blur-md
        p-6 rounded-2xl
        border border-white/10
        h-64

        flex items-center justify-center
        text-gray-400

        shadow-[0_0_30px_rgba(34,211,238,0.15)]
      ">
        Full Chart Coming Soon 📈
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">

        <button
          onClick={() => buyStock(stock.symbol, stock.price)}
          className="
            flex-1
            bg-cyan-500/80
            hover:bg-cyan-400
            px-6 py-3
            rounded-xl
            font-semibold

            transition-all duration-200
            hover:scale-[1.05]
            hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
          "
        >
          Buy
        </button>

        <button
          onClick={() => sellStock(stock.symbol, stock.price)}
          className="
            flex-1
            bg-pink-500/80
            hover:bg-pink-400
            px-6 py-3
            rounded-xl
            font-semibold

            transition-all duration-200
            hover:scale-[1.05]
            hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]
          "
        >
          Sell
        </button>

      </div>

    </div>
  );
}

export default StockPage;