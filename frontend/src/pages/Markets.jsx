import { useState } from "react";
import { stocks } from "../data/stocks";
import StockCard from "../components/StockCard";

export default function Markets() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredStocks = stocks
    .filter((s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase())
    )
    .filter((s) => {
      if (filter === "gainers") return s.change > 0;
      if (filter === "losers") return s.change < 0;
      return true;
    });

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Markets</h1>
        <p className="text-gray-400 text-sm">
          Explore live simulated assets
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stocks..."
          className="
            flex-1 p-3 rounded-lg
            bg-white/5 border border-white/10
            outline-none
          "
        />

        <div className="flex gap-2">

          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 rounded-lg ${
              filter === "all"
                ? "bg-purple-500/30"
                : "bg-white/5"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("gainers")}
            className={`px-3 py-2 rounded-lg ${
              filter === "gainers"
                ? "bg-cyan-500/30"
                : "bg-white/5"
            }`}
          >
            Gainers
          </button>

          <button
            onClick={() => setFilter("losers")}
            className={`px-3 py-2 rounded-lg ${
              filter === "losers"
                ? "bg-pink-500/30"
                : "bg-white/5"
            }`}
          >
            Losers
          </button>

        </div>

      </div>

      {/* MARKET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {filteredStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}

      </div>

    </div>
  );
}