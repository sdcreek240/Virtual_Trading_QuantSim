import { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState({});
  const [cash, setCash] = useState(10000);
  const [history, setHistory] = useState([]);

  function addToHistory(type, symbol, price, amount) {
    setHistory((prev) => [
      {
        type,
        symbol,
        price,
        amount,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  }

  function buyStock(symbol, price, amount = 1) {
    const cost = price * amount;

    if (cash < cost) return { error: "Not enough cash" };

    setCash((prev) => prev - cost);

    setPortfolio((prev) => ({
      ...prev,
      [symbol]: (prev[symbol] || 0) + amount,
    }));

    addToHistory("BUY", symbol, price, amount);

    return { success: true };
  }

  function sellStock(symbol, price, amount = 1) {
    const current = portfolio[symbol] || 0;

    if (current < amount) {
      return { error: "Not enough shares" };
    }

    setPortfolio((prev) => ({
      ...prev,
      [symbol]: prev[symbol] - amount,
    }));

    setCash((prev) => prev + price * amount);

    addToHistory("SELL", symbol, price, amount);

    return { success: true };
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        cash,
        history,
        buyStock,
        sellStock,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}