import { useState, useMemo } from "react";

// Professional SVG Icons
const Icons = {
    markets: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    economy: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    company: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    search: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    clock: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    external: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
};

const News = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStock, setSelectedStock] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Categories
    const categories = [
        { id: "all", label: "All News", icon: null },
        { id: "markets", label: "Markets", icon: Icons.markets },
        { id: "economy", label: "Economy", icon: Icons.economy },
        { id: "company", label: "Company", icon: Icons.company },
    ];

    // Stocks for filtering
    const stocks = ["TCS", "RELIANCE", "INFY", "HDFC", "ICICI", "BHARTI", "WIPRO", "SBIN"];

    // Demo news data
    const newsData = [
        {
            id: 1,
            title: "Sensex hits all-time high as FIIs pump ₹15,000 crore in December",
            summary: "Foreign investors return to Indian markets with strong buying in banking and IT sectors.",
            category: "markets",
            sentiment: "positive",
            stock: null,
            time: "2 hours ago",
            source: "Economic Times",
        },
        {
            id: 2,
            title: "RBI keeps repo rate unchanged at 6.5% for 11th consecutive time",
            summary: "Central bank maintains accommodative stance to support growth amid global uncertainties.",
            category: "economy",
            sentiment: "neutral",
            stock: null,
            time: "4 hours ago",
            source: "Mint",
        },
        {
            id: 3,
            title: "TCS wins $2 billion deal from leading European bank",
            summary: "Tata Consultancy Services secures its largest deal in the banking sector this fiscal year.",
            category: "company",
            sentiment: "positive",
            stock: "TCS",
            time: "5 hours ago",
            source: "Business Standard",
        },
        {
            id: 4,
            title: "Reliance Jio announces aggressive 5G rollout in 50 more cities",
            summary: "Telecom giant aims to cover 1000 cities with 5G by March 2025.",
            category: "company",
            sentiment: "positive",
            stock: "RELIANCE",
            time: "6 hours ago",
            source: "CNBC-TV18",
        },
        {
            id: 5,
            title: "HDFC Bank faces RBI scrutiny over IT outages",
            summary: "Regulator seeks detailed report on recent digital banking disruptions.",
            category: "company",
            sentiment: "negative",
            stock: "HDFC",
            time: "8 hours ago",
            source: "Reuters",
        },
        {
            id: 6,
            title: "Infosys revises guidance upward after strong Q3 performance",
            summary: "IT major raises full-year revenue growth guidance to 4-5%.",
            category: "company",
            sentiment: "positive",
            stock: "INFY",
            time: "10 hours ago",
            source: "Moneycontrol",
        },
        {
            id: 7,
            title: "Global markets rally as US Fed signals rate cuts in 2024",
            summary: "Asian markets follow Wall Street's lead with broad-based gains.",
            category: "markets",
            sentiment: "positive",
            stock: null,
            time: "12 hours ago",
            source: "Bloomberg",
        },
        {
            id: 8,
            title: "India's GDP growth forecast revised to 7.2% by IMF",
            summary: "International Monetary Fund cites strong domestic consumption and investment.",
            category: "economy",
            sentiment: "positive",
            stock: null,
            time: "1 day ago",
            source: "Financial Express",
        },
        {
            id: 9,
            title: "Wipro announces partnership with Microsoft for AI solutions",
            summary: "Strategic collaboration to develop enterprise AI applications for global clients.",
            category: "company",
            sentiment: "positive",
            stock: "WIPRO",
            time: "1 day ago",
            source: "TechCrunch India",
        },
        {
            id: 10,
            title: "ICICI Bank reports 25% YoY growth in retail loans",
            summary: "Private lender sees strong demand in home and auto loan segments.",
            category: "company",
            sentiment: "positive",
            stock: "ICICI",
            time: "1 day ago",
            source: "Economic Times",
        },
    ];

    // Filter news
    const filteredNews = useMemo(() => {
        let result = newsData;

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter(n => n.category === selectedCategory);
        }

        // Filter by stock
        if (selectedStock) {
            result = result.filter(n => n.stock === selectedStock);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(n =>
                n.title.toLowerCase().includes(query) ||
                n.summary.toLowerCase().includes(query)
            );
        }

        return result;
    }, [selectedCategory, selectedStock, searchQuery]);

    const sentimentConfig = {
        positive: { label: "Positive", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
        negative: { label: "Negative", color: "bg-red-500/10 text-red-400 border-red-500/30", dot: "bg-red-400" },
        neutral: { label: "Neutral", color: "bg-gray-500/10 text-gray-400 border-gray-500/30", dot: "bg-gray-400" },
    };

    const categoryConfig = {
        markets: { icon: Icons.markets, color: "text-cyan-400" },
        economy: { icon: Icons.economy, color: "text-purple-400" },
        company: { icon: Icons.company, color: "text-amber-400" },
    };

    const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:border-white/10 hover:shadow-xl";

    return (
        <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <h1
                className="text-4xl md:text-5xl font-black tracking-tight mb-8"
                style={{
                    background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 50%, #a5f3fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                News
            </h1>

            {/* Filters Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

                {/* Category Tabs */}
                <div className="lg:col-span-2 flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${selectedCategory === cat.id
                                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Stock Filter */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {Icons.search}
                        </div>
                        <select
                            value={selectedStock}
                            onChange={(e) => setSelectedStock(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 cursor-pointer appearance-none"
                        >
                            <option value="">All Stocks</option>
                            {stocks.map(stock => (
                                <option key={stock} value={stock} className="bg-[#0F172A]">{stock}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    {Icons.search}
                </div>
                <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                />
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-4">
                {filteredNews.length} news articles
                {selectedStock && <span className="text-cyan-400"> for {selectedStock}</span>}
            </p>

            {/* News List */}
            {filteredNews.length === 0 ? (
                <div className={`${premiumCard} p-12 text-center`}>
                    <p className="text-gray-400">No news found matching your criteria</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredNews.map(news => {
                        const sentiment = sentimentConfig[news.sentiment];
                        const category = categoryConfig[news.category];

                        return (
                            <div key={news.id} className={`${premiumCard} p-5 group cursor-pointer`}>
                                <div className="flex items-start gap-4">

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Tags Row */}
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            {/* Category */}
                                            <span className={`flex items-center gap-1 text-xs font-medium ${category.color}`}>
                                                {category.icon}
                                                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                                            </span>

                                            {/* Stock Tag */}
                                            {news.stock && (
                                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-bold text-cyan-400 border border-cyan-500/30">
                                                    {news.stock}
                                                </span>
                                            )}

                                            {/* Sentiment */}
                                            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border ${sentiment.color}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sentiment.dot}`} />
                                                {sentiment.label}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                            {news.title}
                                        </h3>

                                        {/* Summary */}
                                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                                            {news.summary}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                {Icons.clock}
                                                {news.time}
                                            </span>
                                            <span>{news.source}</span>
                                        </div>
                                    </div>

                                    {/* External Link Icon */}
                                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-cyan-400">
                                        {Icons.external}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default News;
