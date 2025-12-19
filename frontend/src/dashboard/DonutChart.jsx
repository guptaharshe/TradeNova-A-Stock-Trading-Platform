import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: "RELIANCE", value: 85000, color: "#3B82F6" },
    { name: "TCS", value: 65000, color: "#8B5CF6" },
    { name: "HDFC Bank", value: 55000, color: "#10B981" },
    { name: "Infosys", value: 45000, color: "#F59E0B" },
    { name: "Others", value: 28500, color: "#EF4444" },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const item = payload[0];
        return (
            <div className="bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 shadow-2xl backdrop-blur-xl">
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-gray-400 text-sm">₹{item.value.toLocaleString('en-IN')}</p>
            </div>
        );
    }
    return null;
};

export default function DonutChart() {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-52 h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                            animationDuration={800}
                            animationBegin={0}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    stroke="transparent"
                                    className="transition-all duration-300 hover:opacity-80"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center text with glow */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Total</p>
                    <p
                        className="text-2xl font-bold"
                        style={{
                            background: 'linear-gradient(to right, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        ₹{(total / 1000).toFixed(0)}K
                    </p>
                </div>
            </div>

            {/* Legend - Premium */}
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 group cursor-default">
                        <div
                            className="w-3 h-3 rounded-full shadow-lg transition-transform group-hover:scale-125"
                            style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
                        />
                        <span className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
