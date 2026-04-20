import { useNavigate } from "react-router-dom";
import StockSparkline from "./StockSparkline";

function StockCard({ stock }) {
  const navigate = useNavigate();
  const isPositive = stock.change >= 0;
  const flash = isPositive ? "shadow-[0_0_15px_rgba(34,211,238,0.25)]" : "shadow-[0_0_15px_rgba(236,72,153,0.25)]";

  return (
    <div
      className={`
  bg-white/5 backdrop-blur-md
  border border-white/10
  p-5 rounded-2xl

  cursor-pointer

  hover:scale-[1.04]
  hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]
  hover:border-purple-400/40

  ${flash}

  transition-all duration-300
`}
    >

      <div className="flex justify-between items-start">

        <div>
          <h3 className="font-semibold">{stock.name}</h3>
          <p className="text-gray-400 text-sm">{stock.symbol}</p>
        </div>

        <div className={`font-bold ${
          isPositive ? "text-cyan-400" : "text-pink-500"
        }`}>
          {isPositive ? "+" : ""}{stock.change}%
        </div>

      </div>

      <div className="mt-4 flex justify-between items-end">

        <div>
          <p className="text-2xl font-bold tabular-nums">
            ${stock.price}
          </p>
          <p className="text-gray-400 text-sm">Live price</p>
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