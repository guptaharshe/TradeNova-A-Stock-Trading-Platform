const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { buyStock, sellStock } = require('../controllers/orderController');

router.post('/buy', auth, buyStock);
router.post('/sell', auth, sellStock);

module.exports = router;
