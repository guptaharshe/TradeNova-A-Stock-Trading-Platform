import api from "./api";

const orderService = {
    // Buy stock
    buy: async (symbol, quantity, price, fees = 0) => {
        const response = await api.post("/orders/buy", {
            symbol,
            quantity,
            price,
            fees
        });
        return response.data;
    },

    // Sell stock
    sell: async (symbol, quantity, price, fees = 0) => {
        const response = await api.post("/orders/sell", {
            symbol,
            quantity,
            price,
            fees
        });
        return response.data;
    },
};

export default orderService;
