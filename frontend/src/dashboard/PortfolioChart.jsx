import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Generate more realistic data for different time periods
const generateData = (period) => {
  const baseValue = 240000;
  const variance = 15000;

  const dataPoints = {
    "1D": [
      { label: "9AM", value: 238000 },
      { label: "10AM", value: 240500 },
      { label: "11AM", value: 242000 },
      { label: "12PM", value: 239500 },
      { label: "1PM", value: 243000 },
      { label: "2PM", value: 245500 },
      { label: "3PM", value: 244000 },
      { label: "Now", value: 278500 },
    ],
    "1W": [
      { label: "Mon", value: 240000 },
      { label: "Tue", value: 252000 },
      { label: "Wed", value: 260000 },
      { label: "Thu", value: 268000 },
      { label: "Fri", value: 275000 },
      { label: "Sat", value: 276500 },
      { label: "Sun", value: 278500 },
    ],
    "1M": [
      { label: "Week 1", value: 225000 },
      { label: "Week 2", value: 238000 },
      { label: "Week 3", value: 255000 },
      { label: "Week 4", value: 278500 },
    ],
    "3M": [
      { label: "Oct", value: 195000 },
      { label: "Nov", value: 230000 },
      { label: "Dec", value: 278500 },
    ],
    "1Y": [
      { label: "Jan", value: 150000 },
      { label: "Mar", value: 175000 },
      { label: "May", value: 195000 },
      { label: "Jul", value: 220000 },
      { label: "Sep", value: 245000 },
      { label: "Nov", value: 260000 },
      { label: "Dec", value: 278500 },
    ],
    "ALL": [
      { label: "2022", value: 100000 },
      { label: "Q2 '22", value: 120000 },
      { label: "Q4 '22", value: 145000 },
      { label: "Q2 '23", value: 180000 },
      { label: "Q4 '23", value: 225000 },
      { label: "Now", value: 278500 },
    ],
  };

  return dataPoints[period] || dataPoints["1W"];
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A2238] border border-white/10 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white font-semibold text-lg">
          Value: ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

export default function PortfolioChart() {
  const [period, setPeriod] = useState("1W");
  const data = generateData(period);

  const periods = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

  // Calculate change
  const startValue = data[0]?.value || 0;
  const currentValue = data[data.length - 1]?.value || 0;
  const change = currentValue - startValue;
  const changePercent = ((change / startValue) * 100).toFixed(2);
  const isPositive = change >= 0;

  return (
    <div className="space-y-4">
      {/* Header with value and period selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold text-white">
            ₹{currentValue.toLocaleString('en-IN')}
          </h3>
          <p className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}₹{change.toLocaleString('en-IN')} ({isPositive ? '+' : ''}{changePercent}%)
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-[#0D1321] rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${period === p
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorValue)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
