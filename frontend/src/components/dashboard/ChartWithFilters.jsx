import { useState } from "react";
import {
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Demo data for different time periods
const timeData = {
    "1D": [
        { time: "9:30", value: 10000 },
        { time: "10:30", value: 10200 },
        { time: "11:30", value: 10150 },
        { time: "12:30", value: 10400 },
        { time: "1:30", value: 10350 },
        { time: "2:30", value: 10500 },
        { time: "3:30", value: 10450 },
    ],
    "1W": [
        { time: "Mon", value: 10000 },
        { time: "Tue", value: 10400 },
        { time: "Wed", value: 10100 },
        { time: "Thu", value: 10800 },
        { time: "Fri", value: 11200 },
    ],
    "1M": [
        { time: "Week 1", value: 10000 },
        { time: "Week 2", value: 10800 },
        { time: "Week 3", value: 10500 },
        { time: "Week 4", value: 11500 },
    ],
    "3M": [
        { time: "Oct", value: 9500 },
        { time: "Nov", value: 10200 },
        { time: "Dec", value: 11500 },
    ],
    "1Y": [
        { time: "Jan", value: 8000 },
        { time: "Mar", value: 8500 },
        { time: "May", value: 9200 },
        { time: "Jul", value: 10000 },
        { time: "Sep", value: 10800 },
        { time: "Nov", value: 11500 },
    ],
    "ALL": [
        { time: "2020", value: 5000 },
        { time: "2021", value: 6500 },
        { time: "2022", value: 7800 },
        { time: "2023", value: 9500 },
        { time: "2024", value: 11500 },
    ],
};

const periods = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

export default function ChartWithFilters({ title = "Portfolio Value" }) {
    const [selectedPeriod, setSelectedPeriod] = useState("1W");
    const data = timeData[selectedPeriod];

    // Calculate change
    const startValue = data[0]?.value || 0;
    const endValue = data[data.length - 1]?.value || 0;
    const change = endValue - startValue;
    const changePercent = ((change / startValue) * 100).toFixed(2);
    const isPositive = change >= 0;

    return (
        <div className="bg-[#1A2238] rounded-xl p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold">₹{endValue.toLocaleString()}</span>
                        <span className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
                            {isPositive ? "+" : ""}₹{change.toLocaleString()} ({isPositive ? "+" : ""}{changePercent}%)
                        </span>
                    </div>
                </div>

                {/* Time Period Filters */}
                <div className="flex gap-1 bg-[#0A0F1F] rounded-lg p-1">
                    {periods.map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${selectedPeriod === period
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            stroke="#94A3B8"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#94A3B8"
                            tickLine={false}
                            axisLine={false}
                            width={60}
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0A0F1F",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#E5E7EB" }}
                            formatter={(value) => [`₹${value.toLocaleString()}`, "Value"]}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? "#10B981" : "#EF4444"}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                    </ReLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
