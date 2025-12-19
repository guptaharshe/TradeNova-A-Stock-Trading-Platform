// Simple mock price service
const prices = {
  AAPL: 210,
  TSLA: 180,
  MSFT: 320,
  GOOG: 140,
  INFY: 1500,
  TCS: 3800
};

// Get price for any symbol
exports.getPrice = (symbol) => {
  return prices[symbol.toUpperCase()] || 100; // fallback price
};
