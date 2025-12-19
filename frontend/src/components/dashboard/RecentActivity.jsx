import Card from "../ui/Card";

const activities = [
    {
        id: 1,
        type: "buy",
        stock: "RELIANCE",
        quantity: 10,
        price: "₹24,500",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "sell",
        stock: "TCS",
        quantity: 5,
        price: "₹16,600",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "dividend",
        stock: "INFY",
        amount: "₹580",
        time: "1 day ago",
    },
    {
        id: 4,
        type: "watchlist",
        stock: "HDFC",
        action: "Added to watchlist",
        time: "2 days ago",
    },
];

const getActivityIcon = (type) => {
    switch (type) {
        case "buy":
            return (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            );
        case "sell":
            return (
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </div>
            );
        case "dividend":
            return (
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
            );
    }
};

const getActivityText = (activity) => {
    switch (activity.type) {
        case "buy":
            return `Bought ${activity.quantity} shares for ${activity.price}`;
        case "sell":
            return `Sold ${activity.quantity} shares for ${activity.price}`;
        case "dividend":
            return `Received dividend of ${activity.amount}`;
        default:
            return activity.action;
    }
};

export default function RecentActivity() {
    return (
        <Card>
            <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-white">{activity.stock}</p>
                                <span className={`text-xs px-2 py-0.5 rounded ${activity.type === "buy" ? "bg-green-500/20 text-green-400" :
                                        activity.type === "sell" ? "bg-red-500/20 text-red-400" :
                                            activity.type === "dividend" ? "bg-yellow-500/20 text-yellow-400" :
                                                "bg-blue-500/20 text-blue-400"
                                    }`}>
                                    {activity.type.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400">{getActivityText(activity)}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
