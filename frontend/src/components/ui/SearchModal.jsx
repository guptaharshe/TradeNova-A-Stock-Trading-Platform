import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function SearchModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const quickLinks = [
        { label: "Dashboard", path: "/dashboard", icon: "🏠" },
        { label: "Markets", path: "/markets", icon: "📈" },
        { label: "Portfolio", path: "/portfolio", icon: "💼" },
        { label: "Orders", path: "/orders", icon: "📋" },
        { label: "Watchlist", path: "/watchlist", icon: "⭐" },
        { label: "Settings", path: "/settings", icon: "⚙️" },
    ];

    const filteredLinks = query
        ? quickLinks.filter((link) =>
            link.label.toLowerCase().includes(query.toLowerCase())
        )
        : quickLinks;

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Search Box */}
            <div className="relative w-full max-w-lg bg-[#1A2238] rounded-xl shadow-2xl border border-white/10 animate-scale-in">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search or jump to..."
                        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        autoFocus
                    />
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-[#0A0F1F] text-gray-400 rounded">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div className="max-h-64 overflow-y-auto py-2">
                    {filteredLinks.length === 0 ? (
                        <p className="px-4 py-3 text-gray-400 text-sm">No results found</p>
                    ) : (
                        filteredLinks.map((link) => (
                            <button
                                key={link.path}
                                onClick={() => handleNavigate(link.path)}
                                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/5 transition"
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span className="text-white">{link.label}</span>
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-xs text-gray-500">
                    <span>
                        <kbd className="px-1.5 py-0.5 bg-[#0A0F1F] rounded">↵</kbd> to select
                    </span>
                    <span>
                        <kbd className="px-1.5 py-0.5 bg-[#0A0F1F] rounded">↑</kbd>
                        <kbd className="px-1.5 py-0.5 bg-[#0A0F1F] rounded ml-1">↓</kbd> to navigate
                    </span>
                </div>
            </div>
        </div>
    );
}
