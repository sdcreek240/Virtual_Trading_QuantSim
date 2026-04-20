import { useEffect, useState } from "react";
import { stocks as initialStocks, simulatePrice } from "../data/stocks";
import StockCard from "../components/StockCard";


function Dashboard() {
  const [data, setData] = useState(initialStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => simulatePrice(prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-2">
        Market Dashboard
      </h2>

      <p className="text-gray-400 mb-8">
        Live simulated trading environment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>

    </div>
  );
  <div className="mt-6 bg-white/5 p-4 rounded-xl border border-white/10">
  <h3 className="font-bold mb-2">Portfolio</h3>

  {Object.keys(portfolio).length === 0 ? (
    <p className="text-gray-400">No holdings yet</p>
  ) : (
    Object.entries(portfolio).map(([symbol, amount]) => (
      <p key={symbol}>
        {symbol}: {amount}
      </p>
    ))
  )}
</div>
}

export default Dashboard;