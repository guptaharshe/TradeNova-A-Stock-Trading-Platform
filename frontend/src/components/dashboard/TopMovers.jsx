import Card from "../ui/Card";

const gainersData = [
    { name: "BHARTIARTL", change: "+3.2%", price: "₹1,180" },
    { name: "RELIANCE", change: "+2.1%", price: "₹2,485" },
    { name: "WIPRO", change: "+1.8%", price: "₹428" },
];

const losersData = [
    { name: "HDFC", change: "-2.4%", price: "₹1,572" },
    { name: "TCS", change: "-1.8%", price: "₹3,280" },
    { name: "SBIN", change: "-1.2%", price: "₹618" },
];

export default function TopMovers() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Gainers */}
            <Card>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <h3 className="font-semibold text-white">Top Gainers</h3>
                </div>
                <div className="space-y-3">
                    {gainersData.map((stock, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">{stock.name}</p>
                                <p className="text-sm text-gray-400">{stock.price}</p>
                            </div>
                            <span className="text-green-400 font-medium">{stock.change}</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Top Losers */}
            <Card>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <h3 className="font-semibold text-white">Top Losers</h3>
                </div>
                <div className="space-y-3">
                    {losersData.map((stock, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">{stock.name}</p>
                                <p className="text-sm text-gray-400">{stock.price}</p>
                            </div>
                            <span className="text-red-400 font-medium">{stock.change}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
