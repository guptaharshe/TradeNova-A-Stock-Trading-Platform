import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const Portfolio = () => {
  // Holdings data with all required fields
  const holdings = [
    { symbol: "RELIANCE", name: "Reliance Industries", qty: 15, avgPrice: 2380, currentPrice: 2450, prevClose: 2421, sector: "Energy" },
    { symbol: "TCS", name: "Tata Consultancy", qty: 8, avgPrice: 3280, currentPrice: 3320, prevClose: 3350, sector: "IT" },
    { symbol: "INFY", name: "Infosys Limited", qty: 20, avgPrice: 1420, currentPrice: 1480, prevClose: 1468, sector: "IT" },
    { symbol: "HDFC", name: "HDFC Bank", qty: 12, avgPrice: 1580, currentPrice: 1610, prevClose: 1628, sector: "Banking" },
    { symbol: "ICICI", name: "ICICI Bank", qty: 18, avgPrice: 980, currentPrice: 1025, prevClose: 1012, sector: "Banking" },
    { symbol: "BHARTI", name: "Bharti Airtel", qty: 10, avgPrice: 1100, currentPrice: 1180, prevClose: 1143, sector: "IT" },
    { symbol: "SUNPHARMA", name: "Sun Pharma", qty: 6, avgPrice: 1650, currentPrice: 1720, prevClose: 1695, sector: "Pharma" },
  ];

  // Realized P&L from sold stocks
  const realizedTrades = [
    { symbol: "WIPRO", qty: 25, buyPrice: 380, sellPrice: 428, date: "2024-11-15" },
    { symbol: "SBIN", qty: 30, buyPrice: 580, sellPrice: 618, date: "2024-12-01" },
  ];

  // Calculate totals
  const totals = useMemo(() => {
    const totalInvested = holdings.reduce((sum, h) => sum + (h.avgPrice * h.qty), 0);
    const currentValue = holdings.reduce((sum, h) => sum + (h.currentPrice * h.qty), 0);
    const unrealizedPnL = currentValue - totalInvested;
    const realizedPnL = realizedTrades.reduce((sum, t) => sum + ((t.sellPrice - t.buyPrice) * t.qty), 0);
    const dayChange = holdings.reduce((sum, h) => sum + ((h.currentPrice - h.prevClose) * h.qty), 0);

    return { totalInvested, currentValue, unrealizedPnL, realizedPnL, dayChange };
  }, []);

  // Sector allocation
  const sectorData = useMemo(() => {
    const sectors = {};
    holdings.forEach(h => {
      const value = h.currentPrice * h.qty;
      sectors[h.sector] = (sectors[h.sector] || 0) + value;
    });

    const total = Object.values(sectors).reduce((a, b) => a + b, 0);
    return Object.entries(sectors).map(([name, value]) => ({
      name,
      value: Math.round((value / total) * 100),
      amount: value,
    }));
  }, []);

  const sectorColors = {
    IT: "#8B5CF6",
    Banking: "#3B82F6",
    Energy: "#10B981",
    Pharma: "#F59E0B",
    Others: "#6B7280",
  };

  const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl transition-all duration-300";

  return (
    <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
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
        Portfolio
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className={`${premiumCard} p-4`}>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Invested</p>
          <p className="text-xl font-bold text-white">₹{totals.totalInvested.toLocaleString()}</p>
        </div>
        <div className={`${premiumCard} p-4`}>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Value</p>
          <p className="text-xl font-bold text-white">₹{totals.currentValue.toLocaleString()}</p>
        </div>
        <div className={`${premiumCard} p-4 border-l-2 ${totals.unrealizedPnL >= 0 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Unrealized P&L</p>
          <p className={`text-xl font-bold ${totals.unrealizedPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totals.unrealizedPnL >= 0 ? '+' : ''}₹{totals.unrealizedPnL.toLocaleString()}
          </p>
        </div>
        <div className={`${premiumCard} p-4 border-l-2 ${totals.realizedPnL >= 0 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Realized P&L</p>
          <p className={`text-xl font-bold ${totals.realizedPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totals.realizedPnL >= 0 ? '+' : ''}₹{totals.realizedPnL.toLocaleString()}
          </p>
        </div>
        <div className={`${premiumCard} p-4 border-l-2 ${totals.dayChange >= 0 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Day's Change</p>
          <p className={`text-xl font-bold ${totals.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totals.dayChange >= 0 ? '+' : ''}₹{totals.dayChange.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className={`${premiumCard} mb-6 overflow-hidden`}>
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="text-lg font-bold text-white">Holdings</h3>
            <span className="text-sm text-gray-500">({holdings.length} stocks)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.02]">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-4 font-semibold">Stock</th>
                <th className="px-4 py-4 font-semibold text-right">Qty</th>
                <th className="px-4 py-4 font-semibold text-right">Avg Price</th>
                <th className="px-4 py-4 font-semibold text-right">Current</th>
                <th className="px-4 py-4 font-semibold text-right">Invested</th>
                <th className="px-4 py-4 font-semibold text-right">Current Value</th>
                <th className="px-4 py-4 font-semibold text-right">P&L</th>
                <th className="px-4 py-4 font-semibold text-right">Day's Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {holdings.map((h) => {
                const invested = h.avgPrice * h.qty;
                const current = h.currentPrice * h.qty;
                const pnl = current - invested;
                const pnlPct = ((pnl / invested) * 100).toFixed(2);
                const dayChange = (h.currentPrice - h.prevClose) * h.qty;
                const dayChangePct = ((h.currentPrice - h.prevClose) / h.prevClose * 100).toFixed(2);
                const isPnLPositive = pnl >= 0;
                const isDayPositive = dayChange >= 0;

                return (
                  <tr key={h.symbol} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-white">{h.symbol}</p>
                        <p className="text-xs text-gray-500">{h.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-white font-medium">{h.qty}</td>
                    <td className="px-4 py-4 text-right text-gray-400">₹{h.avgPrice.toLocaleString()}</td>
                    <td className="px-4 py-4 text-right text-white font-medium">₹{h.currentPrice.toLocaleString()}</td>
                    <td className="px-4 py-4 text-right text-gray-400">₹{invested.toLocaleString()}</td>
                    <td className="px-4 py-4 text-right text-white font-medium">₹{current.toLocaleString()}</td>
                    <td className="px-4 py-4 text-right">
                      <div className={isPnLPositive ? 'text-emerald-400' : 'text-red-400'}>
                        <p className="font-semibold">{isPnLPositive ? '+' : ''}₹{pnl.toLocaleString()}</p>
                        <p className="text-xs">({isPnLPositive ? '+' : ''}{pnlPct}%)</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-semibold ${isDayPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                        {isDayPositive ? '+' : ''}{dayChangePct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sector Allocation */}
        <div className={`${premiumCard} p-5`}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <h3 className="text-lg font-bold text-white">Sector Allocation</h3>
          </div>

          <div className="flex items-center gap-8">
            {/* Donut Chart */}
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={sectorColors[entry.name] || sectorColors.Others}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-3">
              {sectorData.map((sector, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sectorColors[sector.name] || sectorColors.Others }}
                    />
                    <span className="text-gray-400">{sector.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold">{sector.value}%</span>
                    <span className="text-gray-500 text-xs ml-2">₹{sector.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Realized P&L History */}
        <div className={`${premiumCard} p-5`}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 className="text-lg font-bold text-white">Realized P&L</h3>
            <span className="text-sm text-gray-500">(Sold Stocks)</span>
          </div>

          <div className="space-y-4">
            {realizedTrades.map((trade, i) => {
              const pnl = (trade.sellPrice - trade.buyPrice) * trade.qty;
              const pnlPct = ((trade.sellPrice - trade.buyPrice) / trade.buyPrice * 100).toFixed(2);
              return (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="font-bold text-white">{trade.symbol}</p>
                    <p className="text-xs text-gray-500">{trade.qty} shares @ ₹{trade.buyPrice} → ₹{trade.sellPrice}</p>
                    <p className="text-xs text-gray-600 mt-1">Sold on {trade.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400">+₹{pnl.toLocaleString()}</p>
                    <p className="text-xs text-emerald-400">+{pnlPct}%</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Realized */}
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-gray-400 font-medium">Total Realized Profit</span>
            <span className="text-xl font-bold text-emerald-400">+₹{totals.realizedPnL.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
