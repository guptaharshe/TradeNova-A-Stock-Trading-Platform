const { executeBuy, executeSell } = require('../services/orderService');

exports.buyStock = async (req, res) => {
  try {
    const { symbol, quantity, price, fees } = req.body;
    if (!symbol || !quantity || !price) return res.status(400).json({ message: 'symbol, quantity, price required' });

    await executeBuy({
      userId: req.user._id,
      symbol: symbol.toUpperCase(),
      quantity,
      price,
      fees: fees || 0
    });

    return res.status(200).json({ message: 'Stock bought successfully' });
  } catch (err) {
    console.error('buyStock error:', err.message);
    return res.status(400).json({ message: err.message });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { symbol, quantity, price, fees } = req.body;
    if (!symbol || !quantity || !price) return res.status(400).json({ message: 'symbol, quantity, price required' });

    await executeSell({
      userId: req.user._id,
      symbol: symbol.toUpperCase(),
      quantity,
      price,
      fees: fees || 0
    });

    return res.status(200).json({ message: 'Stock sold successfully' });
  } catch (err) {
    console.error('sellStock error:', err.message);
    return res.status(400).json({ message: err.message });
  }
};
