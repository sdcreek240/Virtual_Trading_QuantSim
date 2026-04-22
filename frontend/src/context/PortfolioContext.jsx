import { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState({});
  const [cash, setCash] = useState(10000);

  // format:
  // portfolio = {
  //   AAPL: { qty: 2, avgPrice: 150 }
  // }

  function buyStock(symbol, price, qty = 1) {
    const cost = price * qty;

    if (cash < cost) return { error: "Not enough cash" };

    setCash((c) => c - cost);

    setPortfolio((prev) => {
      const existing = prev[symbol];

      if (!existing) {
        return {
          ...prev,
          [symbol]: { qty, avgPrice: price },
        };
      }

      // update weighted average price
      const newQty = existing.qty + qty;
      const newAvg =
        (existing.avgPrice * existing.qty + price * qty) / newQty;

      return {
        ...prev,
        [symbol]: {
          qty: newQty,
          avgPrice: newAvg,
        },
      };
    });

    return { success: true };
  }

  function sellStock(symbol, price, qty = 1) {
    const position = portfolio[symbol];

    if (!position || position.qty < qty) {
      return { error: "Not enough shares" };
    }

    setCash((c) => c + price * qty);

    setPortfolio((prev) => {
      const updatedQty = prev[symbol].qty - qty;

      if (updatedQty === 0) {
        const copy = { ...prev };
        delete copy[symbol];
        return copy;
      }

      return {
        ...prev,
        [symbol]: {
          ...prev[symbol],
          qty: updatedQty,
        },
      };
    });

    return { success: true };
  }

  return (
    <PortfolioContext.Provider
      value={{ portfolio, cash, buyStock, sellStock }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}