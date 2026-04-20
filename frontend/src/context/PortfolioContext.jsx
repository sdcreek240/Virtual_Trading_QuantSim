import { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState({});

  function buyStock(stock, amount) {
    setPortfolio((prev) => ({
      ...prev,
      [stock.symbol]: (prev[stock.symbol] || 0) + Number(amount),
    }));
  }

  function sellStock(stock, amount) {
    setPortfolio((prev) => {
      const current = prev[stock.symbol] || 0;
      const updated = current - Number(amount);

      return {
        ...prev,
        [stock.symbol]: updated > 0 ? updated : 0,
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