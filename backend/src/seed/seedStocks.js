const mongoose = require('mongoose');
const Stock = require('../models/Stock');
require('dotenv').config();

const stocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', currentPrice: 2450, previousClose: 2421 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', currentPrice: 3320, previousClose: 3333 },
    { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT', currentPrice: 1480, previousClose: 1468 },
    { symbol: 'HDFC', name: 'HDFC Bank', sector: 'Banking', currentPrice: 1610, previousClose: 1628 },
    { symbol: 'ICICI', name: 'ICICI Bank', sector: 'Banking', currentPrice: 945, previousClose: 940 },
    { symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT', currentPrice: 420, previousClose: 418 },
    { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', currentPrice: 628, previousClose: 629 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', currentPrice: 1125, previousClose: 1105 },
    { symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', currentPrice: 1245, previousClose: 1238 },
    { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', currentPrice: 465, previousClose: 462 },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', currentPrice: 1785, previousClose: 1800 },
    { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure', currentPrice: 2890, previousClose: 2875 },
    { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', currentPrice: 1065, previousClose: 1058 },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India', sector: 'Automobile', currentPrice: 10250, previousClose: 10320 },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma', currentPrice: 1145, previousClose: 1138 },
    { symbol: 'TATASTEEL', name: 'Tata Steel', sector: 'Metal', currentPrice: 128, previousClose: 125 },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'Finance', currentPrice: 6750, previousClose: 6820 },
    { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Consumer', currentPrice: 2845, previousClose: 2830 },
    { symbol: 'ONGC', name: 'Oil and Natural Gas Corp', sector: 'Energy', currentPrice: 245, previousClose: 242 },
    { symbol: 'TITAN', name: 'Titan Company', sector: 'Consumer', currentPrice: 3120, previousClose: 3095 },
];

const seedStocks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing stocks
        await Stock.deleteMany({});
        console.log('Cleared existing stocks');

        // Insert new stocks
        await Stock.insertMany(stocks);
        console.log(`Seeded ${stocks.length} stocks successfully!`);

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error.message);
        process.exit(1);
    }
};

seedStocks();
