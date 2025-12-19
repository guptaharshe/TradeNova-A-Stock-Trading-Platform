import { useState, useEffect, useMemo } from "react";
import Card from "../components/ui/Card";
import { useWatchlist } from "../context/WatchlistContext";
import { useToast } from "../context/ToastContext";
import TradeModal from "../components/trading/TradeModal";
import stockService from "../services/stockService";
import Spinner from "../components/ui/Spinner";

// Professional SVG Icons
const Icons = {
  search: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  close: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  trendUp: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  trendDown: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>,
  warning: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  eye: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  chart: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  bolt: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  filter: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  sort: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>,
};

const Markets = () => {
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeType, setTradeType] = useState("buy");
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStock, setHoveredStock] = useState(null);

  // Filters and sorting
  const [sortBy, setSortBy] = useState("change");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedSector, setSelectedSector] = useState("All");

  // Sectors
  const sectors = ["All", "IT", "Banking", "Pharma", "Energy", "Auto"];

  // Sort options
  const sortOptions = [
    { value: "change", label: "% Change" },
    { value: "price", label: "Price" },
    { value: "volume", label: "Volume" },
  ];

  // Filter options  
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "gainers", label: "Gainers" },
    { value: "losers", label: "Losers" },
    { value: "volatile", label: "Volatile" },
  ];

  // Demo stock data with more info
  const demoStocks = [
    { symbol: "RELIANCE", name: "Reliance Industries", currentPrice: 2450, previousClose: 2421, sector: "Energy", volume: 12500000, high52w: 2856, low52w: 2180, dma20: 2380 },
    { symbol: "TCS", name: "Tata Consultancy", currentPrice: 3320, previousClose: 3380, sector: "IT", volume: 8200000, high52w: 3989, low52w: 3056, dma20: 3400 },
    { symbol: "INFY", name: "Infosys Limited", currentPrice: 1480, previousClose: 1468, sector: "IT", volume: 9500000, high52w: 1620, low52w: 1210, dma20: 1450 },
    { symbol: "HDFC", name: "HDFC Bank", currentPrice: 1610, previousClose: 1658, sector: "Banking", volume: 14000000, high52w: 1757, low52w: 1363, dma20: 1640 },
    { symbol: "ICICI", name: "ICICI Bank", currentPrice: 1025, previousClose: 1012, sector: "Banking", volume: 11000000, high52w: 1190, low52w: 890, dma20: 1000 },
    { symbol: "BHARTI", name: "Bharti Airtel", currentPrice: 1180, previousClose: 1143, sector: "IT", volume: 7800000, high52w: 1260, low52w: 840, dma20: 1100 },
    { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", currentPrice: 1720, previousClose: 1695, sector: "Pharma", volume: 5500000, high52w: 1890, low52w: 1180, dma20: 1680 },
    { symbol: "TATAMOTORS", name: "Tata Motors", currentPrice: 780, previousClose: 795, sector: "Auto", volume: 18000000, high52w: 980, low52w: 530, dma20: 800 },
  ];

  // Fetch stocks from API
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await stockService.getStocks(searchQuery);
        setStocks(data.length > 0 ? data : demoStocks);
      } catch (err) {
        console.error("Error fetching stocks:", err);
        setStocks(demoStocks);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchStocks, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Format and enhance stock data
  const formatStock = (stock) => {
    const change = ((stock.currentPrice - stock.previousClose) / stock.previousClose * 100);
    const isPositive = change >= 0;
    const volatility = Math.abs(change) > 2;
    const near52High = stock.currentPrice >= stock.high52w * 0.95;
    const below20DMA = stock.currentPrice < stock.dma20;
    const strongMomentum = change > 2;

    return {
      ...stock,
      price: `₹${stock.currentPrice?.toLocaleString()}`,
      change: change.toFixed(2),
      changeType: isPositive ? "positive" : "negative",
      signals: {
        near52High,
        volatility,
        below20DMA,
        strongMomentum,
      },
    };
  };

  // Filter and sort stocks
  const processedStocks = useMemo(() => {
    let result = stocks.map(formatStock);

    // Filter by sector
    if (selectedSector !== "All") {
      result = result.filter(s => s.sector === selectedSector);
    }

    // Filter by type
    if (filterBy === "gainers") {
      result = result.filter(s => s.changeType === "positive");
    } else if (filterBy === "losers") {
      result = result.filter(s => s.changeType === "negative");
    } else if (filterBy === "volatile") {
      result = result.filter(s => s.signals.volatility);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(s =>
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "change") return Math.abs(parseFloat(b.change)) - Math.abs(parseFloat(a.change));
      if (sortBy === "price") return b.currentPrice - a.currentPrice;
      if (sortBy === "volume") return (b.volume || 0) - (a.volume || 0);
      return 0;
    });

    return result;
  }, [stocks, selectedSector, filterBy, sortBy, searchQuery]);

  // Market sentiment
  const sentiment = useMemo(() => {
    const formatted = stocks.map(formatStock);
    const gainers = formatted.filter(s => s.changeType === "positive").length;
    const losers = formatted.filter(s => s.changeType === "negative").length;
    return gainers > losers ? "Bullish" : gainers < losers ? "Bearish" : "Neutral";
  }, [stocks]);

  const handleAddToWatchlist = async (stock) => {
    try {
      await addToWatchlist(stock);
      toast.success(`${stock.symbol} added to watchlist`);
    } catch (_err) {
      toast.error("Failed to add to watchlist");
    }
  };

  const handleTrade = (stock, type) => {
    setSelectedStock(stock);
    setTradeType(type);
    setShowTradeModal(true);
  };

  // Premium card styling
  const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:border-white/10 hover:shadow-xl";

  return (
    <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">

      {/* Header with Title and Market Status */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 50%, #a5f3fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Markets
        </h1>

        {/* Market Status Chip */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-emerald-400">Market Open</span>
        </div>
      </div>

      {/* Market Sentiment Banner */}
      <div className={`mb-6 p-4 rounded-2xl border ${sentiment === "Bullish"
          ? "bg-emerald-500/10 border-emerald-500/30"
          : sentiment === "Bearish"
            ? "bg-red-500/10 border-red-500/30"
            : "bg-gray-500/10 border-gray-500/30"
        }`}>
        <div className="flex items-center gap-3">
          {sentiment === "Bullish" ? Icons.trendUp : sentiment === "Bearish" ? Icons.trendDown : Icons.chart}
          <span className={`font-semibold ${sentiment === "Bullish" ? "text-emerald-400" : sentiment === "Bearish" ? "text-red-400" : "text-gray-400"
            }`}>
            Market Sentiment: {sentiment}
          </span>
          <span className="text-sm text-gray-500">
            {processedStocks.filter(s => s.changeType === "positive").length} gainers, {processedStocks.filter(s => s.changeType === "negative").length} losers
          </span>
        </div>
      </div>

      {/* Sector Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {sectors.map(sector => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${selectedSector === sector
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Search + Sort/Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {Icons.search}
          </div>
          <input
            type="text"
            placeholder="Search stocks by name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {Icons.close}
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F172A] border border-white/10">
          <span className="text-gray-400">{Icons.sort}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#0F172A]">{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">{Icons.filter}</span>
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilterBy(opt.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterBy === opt.value
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-4">
          Showing {processedStocks.length} stocks
        </p>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {/* Stocks Grid */}
      {!loading && processedStocks.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-400 mb-2">{Icons.search}</div>
          <p className="text-gray-400">No stocks found</p>
        </Card>
      ) : !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedStocks.map((stock) => (
            <div
              key={stock.symbol}
              className={`${premiumCard} p-5 group`}
              onMouseEnter={() => setHoveredStock(stock.symbol)}
              onMouseLeave={() => setHoveredStock(null)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stock.changeType === "positive" ? "from-emerald-500/5" : "from-red-500/5"
                } to-transparent opacity-50`} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg text-white">{stock.symbol}</p>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${stock.changeType === "positive"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                        }`}>
                        {stock.changeType === "positive" ? "+" : ""}{stock.change}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-400">{stock.sector}</span>
                </div>

                {/* Price */}
                <p className="text-2xl font-bold text-white mb-3">{stock.price}</p>

                {/* Smart Signals */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {stock.signals.near52High && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {Icons.trendUp} Near 52W High
                    </span>
                  )}
                  {stock.signals.volatility && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {Icons.warning} High Volatility
                    </span>
                  )}
                  {stock.signals.below20DMA && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                      {Icons.trendDown} Below 20 DMA
                    </span>
                  )}
                  {stock.signals.strongMomentum && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {Icons.bolt} Strong Momentum
                    </span>
                  )}
                </div>

                {/* Quick Action Menu - Shows on hover */}
                <div className={`flex gap-2 transition-all duration-300 ${hoveredStock === stock.symbol ? "opacity-100" : "opacity-70"
                  }`}>
                  <button
                    onClick={() => handleTrade(stock, "buy")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-xl bg-emerald-600 hover:bg-emerald-700 transition font-semibold"
                  >
                    {Icons.bolt} Quick Buy
                  </button>
                  <button
                    onClick={() => handleTrade(stock, "sell")}
                    className="flex-1 py-2.5 text-sm rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
                  >
                    Sell
                  </button>
                  <button
                    onClick={() => handleAddToWatchlist(stock)}
                    disabled={isInWatchlist(stock.symbol)}
                    className={`px-3 py-2.5 rounded-xl transition-all ${isInWatchlist(stock.symbol)
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "border border-white/20 hover:bg-white/10 text-gray-400 hover:text-white"
                      }`}
                  >
                    {Icons.eye}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trade Modal */}
      <TradeModal
        isOpen={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        stock={selectedStock}
        type={tradeType}
      />
    </div>
  );
};

export default Markets;
