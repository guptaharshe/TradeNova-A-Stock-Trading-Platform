import PageWrapper from "../components/ui/PageWrapper";
import Card from "../components/ui/Card";
import PortfolioChart from "../dashboard/PortfolioChart";
import DonutChart from "../dashboard/DonutChart";
import TopMovers from "../dashboard/TopMovers";

export default function Dashboard() {
  // Enhanced stat cards with subtext
  const stats = [
    {
      label: "Total Investment",
      value: "₹2,45,000",
      subtext: "+₹15,000 this month",
      subtextColor: "text-emerald-400"
    },
    {
      label: "Current Value",
      value: "₹2,78,500",
      subtext: "Market Open",
      subtextColor: "text-cyan-400"
    },
    {
      label: "Today's P&L",
      value: "+₹3,250",
      valueColor: "text-emerald-400",
      subtext: "+1.18%",
      subtextColor: "text-emerald-400"
    },
    {
      label: "Total Returns",
      value: "+₹33,500",
      valueColor: "text-emerald-400",
      subtext: "+13.67%",
      subtextColor: "text-emerald-400"
    },
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

  return (
    <PageWrapper
      title="Dashboard"
      titleStyle={{
        background: 'linear-gradient(to right, #22d3ee, #67e8f9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <Card key={i} className="bg-[#0F172A] border-white/5">
            <p className="text-gray-400 text-sm">{item.label}</p>
            <h2 className={`text-2xl font-bold mt-1 ${item.valueColor || "text-white"}`}>
              {item.value}
            </h2>
            {item.subtext && (
              <p className={`text-xs mt-1 ${item.subtextColor || "text-gray-500"}`}>
                {item.subtext}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Portfolio Value Chart */}
      <Card className="bg-[#0F172A] border-white/5">
        <h3 className="text-white font-semibold mb-4">Portfolio Value</h3>
        <PortfolioChart />
      </Card>

      {/* Bottom Row: Breakdown + Gainers + Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Portfolio Breakdown */}
        <Card className="bg-[#0F172A] border-white/5">
          <h3 className="text-white font-semibold mb-4">Portfolio Breakdown</h3>
          <DonutChart />
        </Card>

        {/* Top Gainers */}
        <TopMovers
          title="Top Gainers"
          stocks={topGainers}
          type="gainers"
        />

        {/* Top Losers */}
        <TopMovers
          title="Top Losers"
          stocks={topLosers}
          type="losers"
        />
      </div>
    </PageWrapper>
  );
}
