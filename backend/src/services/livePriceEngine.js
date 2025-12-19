const io = require("../server");  // correct IO import

let prices = {
  AAPL: 210,
  TSLA: 180,
  MSFT: 320,
  GOOG: 140,
};

function randomMove(price) {
  const change = (Math.random() * 2 - 1) * 1.5;
  return Math.max(1, price + change);
}

function startPriceFeed() {
  setInterval(() => {
    for (let symbol in prices) {
      prices[symbol] = Number(randomMove(prices[symbol]).toFixed(2));
    }

    io.emit("priceUpdate", prices);
    console.log("Price update:", prices);
  }, 1500);
}

module.exports = startPriceFeed;
