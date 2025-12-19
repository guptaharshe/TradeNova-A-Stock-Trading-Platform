const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    sector: {
        type: String,
        default: 'General'
    },

    currentPrice: {
        type: Number,
        required: true
    },

    previousClose: {
        type: Number,
        default: 0
    },

    dayHigh: {
        type: Number,
        default: 0
    },

    dayLow: {
        type: Number,
        default: 0
    },

    volume: {
        type: Number,
        default: 0
    },

    marketCap: {
        type: Number,
        default: 0
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Virtual for price change
StockSchema.virtual('change').get(function () {
    if (!this.previousClose) return 0;
    return ((this.currentPrice - this.previousClose) / this.previousClose * 100).toFixed(2);
});

// Virtual for change type
StockSchema.virtual('changeType').get(function () {
    return this.currentPrice >= this.previousClose ? 'positive' : 'negative';
});

// Ensure virtuals are included in JSON
StockSchema.set('toJSON', { virtuals: true });
StockSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Stock', StockSchema);
