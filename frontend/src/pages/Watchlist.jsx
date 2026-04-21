import { usePortfolio } from "../context/PortfolioContext";

export default function Watchlist() {
  const { history } = usePortfolio();

  return (
    <div className="p-6 text-white space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Trade History</h1>
        <p className="text-gray-400 text-sm">
          Your executed trades
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">

        {history.length === 0 ? (
          <p className="text-gray-400">No trades yet</p>
        ) : (
          <div className="space-y-3">

            {history.map((t, i) => (
              <div
                key={i}
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
                  <p className={
                    t.type === "BUY"
                      ? "text-cyan-400 font-bold"
                      : "text-pink-500 font-bold"
                  }>
                    {t.type}
                  </p>

                  <p className="text-sm text-gray-400">
                    {t.symbol} • {t.amount} share(s)
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p>${t.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">
                    {t.time}
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