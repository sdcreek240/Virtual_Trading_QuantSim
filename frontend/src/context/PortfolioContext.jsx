import { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState({});

  function buyStock(stock, amount) {
    setPortfolio((prev) => {
      const existing = prev[stock.symbol] || 0;

      return {
        ...prev,
        [stock.symbol]: existing + Number(amount),
      };
    });
  }

  function sellStock(stock, amount) {
    setPortfolio((prev) => {
      const existing = prev[stock.symbol] || 0;
      const newValue = existing - Number(amount);

      return {
        ...prev,
        [stock.symbol]: newValue > 0 ? newValue : 0,
      };
    });
  }

  return (
    <PortfolioContext.Provider value={{ portfolio, buyStock, sellStock }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}