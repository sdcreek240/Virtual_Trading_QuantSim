import { usePortfolio } from "../context/PortfolioContext";
import { stocks } from "../data/stocks";

export default function Portfolio() {
  const { portfolio, cash } = usePortfolio();

  const enrichedHoldings = Object.entries(portfolio).map(
    ([symbol, amount]) => {
      const stock = stocks.find((s) => s.symbol === symbol);

      const currentPrice = stock?.price || 0;
      const value = currentPrice * amount;
      const costBasis = (stock?.price || 0) * amount * 0.95; // simulated entry price
      const pnl = value - costBasis;

      return {
        symbol,
        amount,
        price: currentPrice,
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

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-gray-400 text-sm">
          Your holdings and performance overview
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

                {/* LEFT */}
                <div>
                  <p className="font-bold">{h.symbol}</p>
                  <p className="text-xs text-gray-400">
                    {h.amount} shares
                  </p>
                </div>

                {/* CENTER */}
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