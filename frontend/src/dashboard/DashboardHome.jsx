import Card from "../components/ui/Card";
import PortfolioChart from "./PortfolioChart";
import DonutChart from "./DonutChart";
import TopMovers from "./TopMovers";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Professional SVG Icons
const Icons = {
  investment: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  trending: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  target: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  status: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  risk: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  volatility: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  bell: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  arrowUp: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const DashboardHome = () => {
  // Enhanced stat cards with subtext
  const stats = [
    {
      label: "Total Investment",
      value: "₹2,45,000",
      subtext: "+₹15,000 this month",
      subtextColor: "text-emerald-400",
      gradient: "from-emerald-500/20 to-transparent",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      icon: Icons.investment
    },
    {
      label: "Current Value",
      value: "₹2,78,500",
      subtext: "Market Open",
      subtextColor: "text-cyan-400",
      gradient: "from-cyan-500/20 to-transparent",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
      icon: Icons.chart
    },
    {
      label: "Today's P&L",
      value: "+₹3,250",
      valueColor: "text-emerald-400",
      subtext: "+1.18%",
      subtextColor: "text-emerald-400",
      gradient: "from-green-500/20 to-transparent",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      icon: Icons.trending
    },
    {
      label: "Total Returns",
      value: "+₹33,500",
      valueColor: "text-emerald-400",
      subtext: "+13.67%",
      subtextColor: "text-emerald-400",
      gradient: "from-purple-500/20 to-transparent",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      icon: Icons.target
    },
  ];

  // Status strip data
  const statusItems = [
    { icon: Icons.status, label: "Market Status", value: "Open", color: "text-emerald-400", iconColor: "text-emerald-400", glow: "shadow-emerald-500/20" },
    { icon: Icons.risk, label: "Risk Level", value: "Medium", color: "text-amber-400", iconColor: "text-amber-400", glow: "shadow-amber-500/20" },
    { icon: Icons.volatility, label: "Volatility", value: "12.5%", color: "text-cyan-400", iconColor: "text-cyan-400", glow: "shadow-cyan-500/20" },
  ];

  // Allocation data for bar chart
  const allocationData = [
    { name: "Equity", value: 72, fill: "#10B981" },
    { name: "Cash", value: 15, fill: "#3B82F6" },
    { name: "IT Sector", value: 35, fill: "#8B5CF6" },
    { name: "Banking", value: 28, fill: "#F59E0B" },
    { name: "Pharma", value: 9, fill: "#EF4444" },
  ];

  // Comparison chart data (Portfolio vs NIFTY)
  const comparisonData = [
    { month: "Jan", portfolio: 100, nifty: 100, sensex: 100 },
    { month: "Feb", portfolio: 105, nifty: 102, sensex: 103 },
    { month: "Mar", portfolio: 108, nifty: 98, sensex: 99 },
    { month: "Apr", portfolio: 115, nifty: 105, sensex: 106 },
    { month: "May", portfolio: 112, nifty: 108, sensex: 107 },
    { month: "Jun", portfolio: 125, nifty: 112, sensex: 114 },
  ];

  // Alert cards data
  const alerts = [
    { icon: Icons.bell, message: "HDFC down 3% today", gradient: "from-red-500/10 via-red-500/5 to-transparent", border: "border-red-500/30", iconColor: "text-red-400", glow: "hover:shadow-red-500/20" },
    { icon: Icons.arrowUp, message: "RELIANCE nearing 52W high", gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent", border: "border-emerald-500/30", iconColor: "text-emerald-400", glow: "hover:shadow-emerald-500/20" },
    { icon: Icons.warning, message: "Portfolio concentrated in IT", gradient: "from-amber-500/10 via-amber-500/5 to-transparent", border: "border-amber-500/30", iconColor: "text-amber-400", glow: "hover:shadow-amber-500/20" },
  ];

  // Top gainers data
  const topGainers = [
    { symbol: "BHARTIARTL", price: 1180, change: 3.2 },
    { symbol: "RELIANCE", price: 2485, change: 2.1 },
    { symbol: "WIPRO", price: 428, change: 1.8 },
  ];

  // Top losers data
  const topLosers = [
    { symbol: "HDFC", price: 1572, change: -2.4 },
    { symbol: "TCS", price: 3280, change: -1.8 },
    { symbol: "SBIN", price: 618, change: -1.2 },
  ];

  // Premium card styling
  const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl p-5 transition-all duration-300 hover:border-white/10 hover:shadow-xl";

  return (
    <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">

      {/* Header Section */}
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 50%, #a5f3fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Dashboard
        </h1>
      </div>

      <div className="space-y-6">

        {/* Status Strip - Premium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusItems.map((item, i) => (
            <div
              key={i}
              className={`${premiumCard} group hover:scale-[1.02] shadow-lg ${item.glow}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${item.iconColor}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Stats Row - Premium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`${premiumCard} group hover:scale-[1.02]`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm font-medium">{item.label}</p>
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor}`}>
                    {item.icon}
                  </div>
                </div>
                <h2 className={`text-3xl font-bold tracking-tight ${item.valueColor || "text-white"}`}>
                  {item.value}
                </h2>
                {item.subtext && (
                  <p className={`text-sm mt-2 font-medium ${item.subtextColor || "text-gray-500"}`}>
                    {item.subtext}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Alert Cards - Premium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl border ${alert.border} p-4 transition-all duration-300 hover:scale-[1.02] shadow-lg ${alert.glow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${alert.gradient}`} />
              <div className="flex items-center gap-3 relative z-10">
                <div className={`${alert.iconColor}`}>{alert.icon}</div>
                <p className="text-sm text-white font-semibold">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Value Chart - Premium */}
        <div className={premiumCard}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Portfolio Value
          </h3>
          <PortfolioChart />
        </div>

        {/* Two Column Layout for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Comparison Chart */}
          <div className={premiumCard}>
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Performance vs Market
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData}>
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                    labelStyle={{ color: '#94A3B8', marginBottom: '8px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="portfolio" stroke="#10B981" strokeWidth={3} dot={false} name="Portfolio" />
                  <Line type="monotone" dataKey="nifty" stroke="#3B82F6" strokeWidth={2} dot={false} name="NIFTY 50" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="sensex" stroke="#F59E0B" strokeWidth={2} dot={false} name="SENSEX" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Allocation Bar Chart */}
          <div className={premiumCard}>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Asset Allocation
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allocationData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={70} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row: Breakdown + Gainers + Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Breakdown */}
          <div className={premiumCard}>
            <div className="absolute top-0 left-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Holdings Breakdown
            </h3>
            <DonutChart />
          </div>

          {/* Top Gainers */}
          <div className={`${premiumCard} !p-0`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
            <TopMovers
              title="Top Gainers"
              stocks={topGainers}
              type="gainers"
            />
          </div>

          {/* Top Losers */}
          <div className={`${premiumCard} !p-0`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
            <TopMovers
              title="Top Losers"
              stocks={topLosers}
              type="losers"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
