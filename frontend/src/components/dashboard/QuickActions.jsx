import { Link } from "react-router-dom";
import Tooltip from "../ui/Tooltip";

export default function QuickActions() {
    const actions = [
        {
            label: "Buy",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            ),
            color: "bg-green-600 hover:bg-green-700",
            to: "/markets",
        },
        {
            label: "Sell",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
            ),
            color: "bg-red-600 hover:bg-red-700",
            to: "/portfolio",
        },
        {
            label: "Watchlist",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            ),
            color: "bg-blue-600 hover:bg-blue-700",
            to: "/watchlist",
        },
        {
            label: "Orders",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            color: "bg-purple-600 hover:bg-purple-700",
            to: "/orders",
        },
    ];

    return (
        <div className="flex items-center gap-3">
            {actions.map((action) => (
                <Tooltip key={action.label} text={action.label}>
                    <Link
                        to={action.to}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${action.color}`}
                    >
                        {action.icon}
                    </Link>
                </Tooltip>
            ))}
        </div>
    );
}
