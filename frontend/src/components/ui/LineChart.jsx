import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 10000 },
  { day: "Tue", value: 10400 },
  { day: "Wed", value: 10100 },
  { day: "Thu", value: 10800 },
  { day: "Fri", value: 11200 },
];

export default function LineChart() {
  return (
    <div className="h-[260px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
          />

          <YAxis
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
            width={70}
          />

          <Tooltip
            cursor={{ stroke: "#1E293B", strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #1E293B",
              borderRadius: "8px",
              fontSize: "14px",
            }}
            labelStyle={{ color: "#E5E7EB" }}
            itemStyle={{ color: "#3B82F6" }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
