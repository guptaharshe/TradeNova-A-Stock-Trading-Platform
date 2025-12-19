import api from "./api";

const watchlistService = {
    // Get user's watchlist
    getWatchlist: async () => {
        const response = await api.get("/watchlist");
        return response.data;
    },

    // Add stock to watchlist
    addToWatchlist: async (symbol) => {
        const response = await api.post("/watchlist/add", { symbol });
        return response.data;
    },

    // Remove stock from watchlist
    removeFromWatchlist: async (symbol) => {
        const response = await api.post("/watchlist/remove", { symbol });
        return response.data;
    },
};

export default watchlistService;
