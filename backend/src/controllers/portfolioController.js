const Holding = require('../models/Holding');
const { getPrice } = require('../services/priceService');

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user._id;

    const holdings = await Holding.find({ userId });

    let totalInvested = 0;
    let totalCurrent = 0;

    const portfolio = [];

    for (const h of holdings) {
      const currentPrice = getPrice(h.symbol);
      const invested = h.quantity * h.avgBuyPrice;
      const currentValue = h.quantity * currentPrice;
      const pl = currentValue - invested;
      const plPercent = invested ? (pl / invested) * 100 : 0;

      totalInvested += invested;
      totalCurrent += currentValue;

      portfolio.push({
        symbol: h.symbol,
        quantity: h.quantity,
        avgBuyPrice: h.avgBuyPrice,
        currentPrice,
        invested,
        currentValue,
        pl,
        plPercent
      });
    }

    return res.json({
      balance: req.user.balance,
      totalInvested,
      totalCurrent,
      totalPL: totalCurrent - totalInvested,
      totalPLPercent: totalInvested ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0,
      holdings: portfolio
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
