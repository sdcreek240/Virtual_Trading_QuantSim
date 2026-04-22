import { usePortfolio } from "../context/PortfolioContext";
import { stocks } from "../data/stocks";
import CountUp from "react-countup";

export default function Portfolio() {
  const { portfolio, cash } = usePortfolio();

  const enrichedHoldings = Object.entries(portfolio).map(
    ([symbol, amount]) => {
      const stock = stocks.find((s) => s.symbol === symbol);

      const price = stock?.price || 0;
      const value = price * amount;

      const costBasis = price * amount * 0.95; // simulated entry price
      const pnl = value - costBasis;

      return {
        symbol,
        amount,
        price,
        value,
        pnl,
      };
    }
  );

  const totalHoldings = enrichedHoldings.reduce(
    (sum, s) => sum + s.value,
    0
  );

  const totalPortfolioValue = totalHoldings + cash;

  const gainers = enrichedHoldings.filter((s) => s.pnl >= 0);
  const losers = enrichedHoldings.filter((s) => s.pnl < 0);

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-gray-400 text-sm">
          Investment performance overview
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm">Total Value</p>
          <p className="text-2xl font-bold">
            ${totalPortfolioValue.toFixed(2)}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm">Invested</p>
          <p className="text-2xl font-bold">
            ${totalHoldings.toFixed(2)}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm">Cash</p>
          <p className="text-2xl font-bold">
            ${cash.toFixed(2)}
          </p>
        </div>

      </div>

      {/* 🟢 WINNERS / 🔴 LOSERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="font-bold text-cyan-400 mb-3">Winners</h2>

          {gainers.length === 0 ? (
            <p className="text-gray-400 text-sm">No gains yet</p>
          ) : (
            gainers.map((s) => (
              <div key={s.symbol} className="flex justify-between text-sm py-1">
                <span>{s.symbol}</span>
                <span className="text-cyan-400">
                  +{s.pnl.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="font-bold text-pink-400 mb-3">Losers</h2>

          {losers.length === 0 ? (
            <p className="text-gray-400 text-sm">No losses</p>
          ) : (
            losers.map((s) => (
              <div key={s.symbol} className="flex justify-between text-sm py-1">
                <span>{s.symbol}</span>
                <span className="text-pink-400">
                  {s.pnl.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

      </div>

      {/* HOLDINGS TABLE */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">

        <h2 className="font-bold mb-4">Holdings</h2>

        {enrichedHoldings.length === 0 ? (
          <p className="text-gray-400">No positions yet</p>
        ) : (
          <div className="space-y-3">

            {enrichedHoldings.map((h) => (
              <div
                key={h.symbol}
                className="
                  flex justify-between items-center
                  p-3 rounded-lg
                  bg-black/20
                  hover:bg-purple-500/10
                  transition
                "
              >

                <div>
                  <p className="font-bold">{h.symbol}</p>
                  <p className="text-xs text-gray-400">
                    {h.amount} shares
                  </p>
                </div>

                <div className="text-right">
                  <p>${h.value.toFixed(2)}</p>
                  <p
                    className={
                      h.pnl >= 0
                        ? "text-cyan-400 text-sm"
                        : "text-pink-500 text-sm"
                    }
                  >
                    {h.pnl >= 0 ? "+" : ""}
                    {h.pnl.toFixed(2)}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}