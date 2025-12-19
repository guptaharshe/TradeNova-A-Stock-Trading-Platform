import api from "./api";

const portfolioService = {
    // Get user's portfolio
    getPortfolio: async () => {
        const response = await api.get("/portfolio");
        return response.data;
    },

    // Get portfolio statistics (total value, P&L, etc.)
    getPortfolioStats: async () => {
        const response = await api.get("/portfolio/stats");
        return response.data;
    },

    // Get portfolio performance history
    getPortfolioHistory: async (period = "1M") => {
        const response = await api.get(`/portfolio/history?period=${period}`);
        return response.data;
    },

    // Get portfolio holdings breakdown
    getHoldings: async () => {
        const response = await api.get("/portfolio/holdings");
        return response.data;
    },
};

export default portfolioService;
