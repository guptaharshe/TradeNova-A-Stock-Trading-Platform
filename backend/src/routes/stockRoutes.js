const express = require('express');
const router = express.Router();
const {
    getStocks,
    getStockBySymbol,
    getTopGainers,
    getTopLosers,
    getMarketOverview
} = require('../controllers/stockController');

// Public routes (no auth required for viewing stocks)
router.get('/', getStocks);
router.get('/gainers', getTopGainers);
router.get('/losers', getTopLosers);
router.get('/market-overview', getMarketOverview);
router.get('/:symbol', getStockBySymbol);

module.exports = router;
