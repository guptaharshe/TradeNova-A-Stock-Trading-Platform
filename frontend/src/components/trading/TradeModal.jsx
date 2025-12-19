import { useState } from "react";
import Modal from "../ui/Modal";
import { useToast } from "../../context/ToastContext";
import orderService from "../../services/orderService";

export default function TradeModal({ isOpen, onClose, stock, type = "buy" }) {
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [orderType, setOrderType] = useState("market");
    const [limitPrice, setLimitPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Parse stock price
    const getStockPrice = () => {
        if (!stock) return 0;
        if (typeof stock.currentPrice === 'number') return stock.currentPrice;
        if (typeof stock.price === 'string') {
            return parseFloat(stock.price.replace(/[₹,]/g, "")) || 0;
        }
        return stock.price || 0;
    };

    const stockPrice = getStockPrice();
    const tradePrice = orderType === "limit" && limitPrice ? parseFloat(limitPrice) : stockPrice;
    const totalValue = (tradePrice * quantity).toLocaleString("en-IN");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stock) return;

        setIsLoading(true);

        try {
            const symbol = stock.symbol || stock.name;

            if (type === "buy") {
                await orderService.buy(symbol, quantity, tradePrice);
                toast.success(`Bought ${quantity} shares of ${symbol} for ₹${totalValue}`);
            } else {
                await orderService.sell(symbol, quantity, tradePrice);
                toast.success(`Sold ${quantity} shares of ${symbol} for ₹${totalValue}`);
            }

            onClose();
            setQuantity(1);
            setLimitPrice("");
            setOrderType("market");
        } catch (error) {
            const message = error.response?.data?.message || `${type === "buy" ? "Buy" : "Sell"} order failed`;
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!stock) return null;

    const stockSymbol = stock.symbol || stock.name;
    const stockName = stock.fullName || stock.name || stock.symbol;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${type === "buy" ? "Buy" : "Sell"} ${stockSymbol}`}>
            <form onSubmit={handleSubmit}>
                {/* Stock Info */}
                <div className="bg-[#0A0F1F] rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">{stockSymbol}</p>
                            <p className="text-sm text-gray-400">{stockName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">₹{stockPrice.toLocaleString()}</p>
                            {stock.change && (
                                <p className={`text-sm ${stock.changeType === "positive" || stock.change > 0 ? "text-green-400" : "text-red-400"}`}>
                                    {typeof stock.change === 'number' ? `${stock.change > 0 ? '+' : ''}${stock.change}%` : stock.change}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Type */}
                <div className="mb-4">
                    <label className="text-sm text-gray-400 mb-2 block">Order Type</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setOrderType("market")}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${orderType === "market"
                                    ? "bg-blue-600 text-white"
                                    : "bg-[#0A0F1F] text-gray-400 hover:text-white"
                                }`}
                        >
                            Market
                        </button>
                        <button
                            type="button"
                            onClick={() => setOrderType("limit")}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${orderType === "limit"
                                    ? "bg-blue-600 text-white"
                                    : "bg-[#0A0F1F] text-gray-400 hover:text-white"
                                }`}
                        >
                            Limit
                        </button>
                    </div>
                </div>

                {/* Limit Price (if limit order) */}
                {orderType === "limit" && (
                    <div className="mb-4">
                        <label className="text-sm text-gray-400 mb-2 block">Limit Price</label>
                        <input
                            type="number"
                            value={limitPrice}
                            onChange={(e) => setLimitPrice(e.target.value)}
                            placeholder="Enter price"
                            className="w-full px-4 py-3 rounded-lg bg-[#0A0F1F] border border-white/10 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                )}

                {/* Quantity */}
                <div className="mb-4">
                    <label className="text-sm text-gray-400 mb-2 block">Quantity</label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 rounded-lg bg-[#0A0F1F] border border-white/10 flex items-center justify-center hover:bg-white/5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="flex-1 px-4 py-3 rounded-lg bg-[#0A0F1F] border border-white/10 text-white text-center focus:outline-none focus:border-blue-500"
                            min="1"
                        />
                        <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 rounded-lg bg-[#0A0F1F] border border-white/10 flex items-center justify-center hover:bg-white/5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Total */}
                <div className="bg-[#0A0F1F] rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Estimated Total</span>
                        <span className="text-xl font-semibold">₹{totalValue}</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${type === "buy"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        } disabled:opacity-50`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                        </>
                    ) : (
                        `${type === "buy" ? "Buy" : "Sell"} ${stockSymbol}`
                    )}
                </button>
            </form>
        </Modal>
    );
}
