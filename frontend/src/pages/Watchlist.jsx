import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useToast } from "../context/ToastContext";
import TradeModal from "../components/trading/TradeModal";
import ConfirmModal from "../components/ui/ConfirmModal";

const Watchlist = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { toast } = useToast();
  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeType, setTradeType] = useState("buy");
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [stockToRemove, setStockToRemove] = useState(null);

  const handleTrade = (stock, type) => {
    setSelectedStock(stock);
    setTradeType(type);
    setShowTradeModal(true);
  };

  const handleRemove = (stock) => {
    setStockToRemove(stock);
  };

  const confirmRemove = () => {
    if (stockToRemove) {
      removeFromWatchlist(stockToRemove.id || stockToRemove.symbol);
      toast.success(`${stockToRemove.symbol || stockToRemove.name} removed from watchlist`);
      setStockToRemove(null);
    }
  };

  // Demo enhanced data (simulating live prices)
  const enhancedWatchlist = watchlist.map(stock => ({
    ...stock,
    currentPrice: stock.currentPrice || parseFloat(stock.price?.replace(/[₹,]/g, '')) || 1000 + Math.random() * 2000,
    prevClose: stock.previousClose || (stock.currentPrice || 1000) * (1 - (Math.random() - 0.5) * 0.05),
  })).map(stock => ({
    ...stock,
    change: ((stock.currentPrice - stock.prevClose) / stock.prevClose * 100).toFixed(2),
    changeType: stock.currentPrice >= stock.prevClose ? "positive" : "negative",
  }));

  const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:border-white/10 hover:shadow-xl";

  return (
    <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 50%, #a5f3fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Watchlist
        </h1>
        {watchlist.length > 0 && (
          <span className="text-sm text-gray-500">{watchlist.length} stocks</span>
        )}
      </div>

      {/* Empty State */}
      {watchlist.length === 0 ? (
        <div className={`${premiumCard} p-12 text-center`}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Start tracking stocks you're interested in. Add stocks from the Markets page to monitor their prices.
          </p>
          <button
            onClick={() => navigate("/markets")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Go to Markets
          </button>
        </div>
      ) : (
        <>
          {/* Watchlist Table */}
          <div className={`${premiumCard} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.02]">
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-4 py-4 font-semibold text-right">Price</th>
                    <th className="px-4 py-4 font-semibold text-right">Change</th>
                    <th className="px-4 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {enhancedWatchlist.map((stock, index) => (
                    <tr key={stock.id || stock.symbol || index} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-white text-lg">{stock.symbol || stock.name}</p>
                          <p className="text-sm text-gray-500">{stock.fullName || stock.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <p className="text-xl font-bold text-white">
                          ₹{stock.currentPrice?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${stock.changeType === "positive"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                          }`}>
                          {stock.changeType === "positive" ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          )}
                          {stock.changeType === "positive" ? "+" : ""}{stock.change}%
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTrade(stock, "buy")}
                            className="px-4 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
                          >
                            Buy
                          </button>
                          <button
                            onClick={() => handleTrade(stock, "sell")}
                            className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-red-500/20"
                          >
                            Sell
                          </button>
                          <button
                            onClick={() => handleRemove(stock)}
                            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
                            title="Remove from watchlist"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View - Hidden on desktop */}
          <div className="md:hidden space-y-3 mt-6">
            {enhancedWatchlist.map((stock, index) => (
              <div key={stock.id || stock.symbol || index} className={`${premiumCard} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-white">{stock.symbol || stock.name}</p>
                    <p className="text-xs text-gray-500">{stock.fullName || stock.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${stock.changeType === "positive"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                    }`}>
                    {stock.changeType === "positive" ? "+" : ""}{stock.change}%
                  </span>
                </div>
                <p className="text-xl font-bold text-white mb-3">
                  ₹{stock.currentPrice?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTrade(stock, "buy")}
                    className="flex-1 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold transition"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleTrade(stock, "sell")}
                    className="flex-1 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition"
                  >
                    Sell
                  </button>
                  <button
                    onClick={() => handleRemove(stock)}
                    className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Trade Modal */}
      <TradeModal
        isOpen={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        stock={selectedStock}
        type={tradeType}
      />

      {/* Remove Confirmation Modal */}
      <ConfirmModal
        isOpen={!!stockToRemove}
        onClose={() => setStockToRemove(null)}
        onConfirm={confirmRemove}
        title="Remove from Watchlist"
        message={`Are you sure you want to remove ${stockToRemove?.symbol || stockToRemove?.name} from your watchlist?`}
        confirmText="Remove"
        variant="danger"
      />
    </div>
  );
};

export default Watchlist;
