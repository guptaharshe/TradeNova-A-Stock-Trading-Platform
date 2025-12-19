const Watchlist = require('../models/Watchlist');

exports.getWatchlist = async (req, res) => {
  const wl = await Watchlist.findOne({ userId: req.user._id });
  res.json(wl || { symbols: [] });
};

exports.addToWatchlist = async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ message: "Symbol required" });

  let wl = await Watchlist.findOne({ userId: req.user._id });

  if (!wl) {
    wl = await Watchlist.create({
      userId: req.user._id,
      symbols: [symbol.toUpperCase()]
    });
  } else {
    if (!wl.symbols.includes(symbol.toUpperCase())) {
      wl.symbols.push(symbol.toUpperCase());
      await wl.save();
    }
  }

  res.json({ message: "Added to watchlist", watchlist: wl });
};

exports.removeFromWatchlist = async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ message: "Symbol required" });

  const wl = await Watchlist.findOne({ userId: req.user._id });
  if (!wl) return res.status(404).json({ message: "No watchlist found" });

  wl.symbols = wl.symbols.filter(s => s !== symbol.toUpperCase());
  await wl.save();

  res.json({ message: "Removed from watchlist", watchlist: wl });
};
