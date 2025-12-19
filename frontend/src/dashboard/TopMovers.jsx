export default function TopMovers({ title, stocks, type }) {
    const isGainer = type === "gainers";
    const dotColor = isGainer ? "bg-emerald-400" : "bg-red-400";
    const changeColor = isGainer ? "text-emerald-400" : "text-red-400";
    const glowColor = isGainer ? "group-hover:shadow-emerald-500/10" : "group-hover:shadow-red-500/10";

    return (
        <div className="p-5 h-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>

            {/* Stock List */}
            <div className="space-y-3">
                {stocks.map((stock, index) => (
                    <div
                        key={index}
                        className={`group flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10 hover:scale-[1.02] ${glowColor} hover:shadow-lg`}
                    >
                        <div>
                            <p className="text-white font-semibold tracking-wide">{stock.symbol}</p>
                            <p className="text-gray-500 text-sm font-medium">₹{stock.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg ${isGainer ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                            <span className={`font-bold ${changeColor}`}>
                                {isGainer ? '+' : ''}{stock.change}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
