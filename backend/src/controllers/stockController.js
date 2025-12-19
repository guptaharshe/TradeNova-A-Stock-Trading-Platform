const Stock = require('../models/Stock');

// Get all stocks (with optional search)
exports.getStocks = async (req, res) => {
    try {
        const { search, sector, limit = 50 } = req.query;

        let query = {};

        // Search by symbol or name
        if (search) {
            query = {
                $or: [
                    { symbol: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Filter by sector
        if (sector) {
            query.sector = sector;
        }

        const stocks = await Stock.find(query)
            .limit(parseInt(limit))
            .sort({ symbol: 1 });

        res.status(200).json(stocks);
    } catch (error) {
        console.error('getStocks error:', error.message);
        res.status(500).json({ message: 'Error fetching stocks' });
    }
};

// Get single stock by symbol
exports.getStockBySymbol = async (req, res) => {
    try {
        const { symbol } = req.params;

        const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });

        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        res.status(200).json(stock);
    } catch (error) {
        console.error('getStockBySymbol error:', error.message);
        res.status(500).json({ message: 'Error fetching stock' });
    }
};

// Get top gainers
exports.getTopGainers = async (req, res) => {
    try {
        const stocks = await Stock.find({});

        // Calculate change and sort
        const withChange = stocks.map(stock => ({
            ...stock.toJSON(),
            changePercent: stock.previousClose
                ? ((stock.currentPrice - stock.previousClose) / stock.previousClose * 100)
                : 0
        }));

        const gainers = withChange
            .filter(s => s.changePercent > 0)
            .sort((a, b) => b.changePercent - a.changePercent)
            .slice(0, 5);

        res.status(200).json(gainers);
    } catch (error) {
        console.error('getTopGainers error:', error.message);
        res.status(500).json({ message: 'Error fetching top gainers' });
    }
};

// Get top losers
exports.getTopLosers = async (req, res) => {
    try {
        const stocks = await Stock.find({});

        const withChange = stocks.map(stock => ({
            ...stock.toJSON(),
            changePercent: stock.previousClose
                ? ((stock.currentPrice - stock.previousClose) / stock.previousClose * 100)
                : 0
        }));

        const losers = withChange
            .filter(s => s.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 5);

        res.status(200).json(losers);
    } catch (error) {
        console.error('getTopLosers error:', error.message);
        res.status(500).json({ message: 'Error fetching top losers' });
    }
};

// Market overview
exports.getMarketOverview = async (req, res) => {
    try {
        const stocks = await Stock.find({});

        const totalStocks = stocks.length;
        const avgPrice = stocks.reduce((sum, s) => sum + s.currentPrice, 0) / totalStocks || 0;

        let gainers = 0;
        let losers = 0;
        stocks.forEach(stock => {
            if (stock.currentPrice > stock.previousClose) gainers++;
            else if (stock.currentPrice < stock.previousClose) losers++;
        });

        res.status(200).json({
            totalStocks,
            averagePrice: avgPrice.toFixed(2),
            gainers,
            losers,
            unchanged: totalStocks - gainers - losers
        });
    } catch (error) {
        console.error('getMarketOverview error:', error.message);
        res.status(500).json({ message: 'Error fetching market overview' });
    }
};
