import api from "./api";

const stockService = {
    // Get all stocks (with optional search)
    getStocks: async (search = "", limit = 50) => {
        const response = await api.get("/stocks", {
            params: { search, limit }
        });
        return response.data;
    },

    // Get single stock by symbol
    getStockBySymbol: async (symbol) => {
        const response = await api.get(`/stocks/${symbol}`);
        return response.data;
    },

    // Get top gainers
    getTopGainers: async () => {
        const response = await api.get("/stocks/gainers");
        return response.data;
    },

    // Get top losers
    getTopLosers: async () => {
        const response = await api.get("/stocks/losers");
        return response.data;
    },

    // Get market overview
    getMarketOverview: async () => {
        const response = await api.get("/stocks/market-overview");
        return response.data;
    },
};

export default stockService;
