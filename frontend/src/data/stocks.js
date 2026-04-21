export const stocks = [
  {
    symbol: "AAPL",
    name: "Apple",
    price: 180,
    change: 1.2,
    history: [170, 172, 175, 178, 180],
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 250,
    change: -0.8,
    history: [260, 255, 252, 251, 250],
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 135,
    change: 0.5,
    history: [130, 132, 134, 133, 135],
  },
];

export function simulatePrice(stocks) {
  return stocks.map((stock) => {
    const change = (Math.random() - 0.5) * 2;

    const newPrice = Math.max(1, stock.price + change);

    const newHistory = [...stock.history, newPrice].slice(-10);

    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      history: newHistory,
    };
  });
}