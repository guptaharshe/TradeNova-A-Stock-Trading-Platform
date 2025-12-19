import { useState, useCallback } from "react";
import Spinner from "../ui/Spinner";

export default function PullToRefresh({ children, onRefresh }) {
    const [isPulling, setIsPulling] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [startY, setStartY] = useState(0);

    const threshold = 80;
    const maxPull = 120;

    const handleTouchStart = useCallback((e) => {
        if (window.scrollY === 0) {
            setStartY(e.touches[0].clientY);
            setIsPulling(true);
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isPulling || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const distance = Math.min(maxPull, Math.max(0, currentY - startY));

        if (distance > 0 && window.scrollY === 0) {
            e.preventDefault();
            setPullDistance(distance);
        }
    }, [isPulling, isRefreshing, startY]);

    const handleTouchEnd = useCallback(async () => {
        if (pullDistance >= threshold && onRefresh && !isRefreshing) {
            setIsRefreshing(true);
            try {
                await onRefresh();
            } finally {
                setIsRefreshing(false);
            }
        }
        setIsPulling(false);
        setPullDistance(0);
    }, [pullDistance, onRefresh, isRefreshing]);

    const progress = Math.min(1, pullDistance / threshold);

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative"
        >
            {/* Pull indicator */}
            <div
                className="absolute left-0 right-0 flex justify-center items-center overflow-hidden transition-all duration-200"
                style={{
                    height: pullDistance,
                    top: 0,
                }}
            >
                {isRefreshing ? (
                    <Spinner size="sm" />
                ) : (
                    <div
                        className="transition-transform duration-200"
                        style={{
                            transform: `rotate(${progress * 360}deg)`,
                            opacity: progress,
                        }}
                    >
                        <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    transition: isPulling ? "none" : "transform 0.2s ease-out",
                }}
            >
                {children}
            </div>
        </div>
    );
}
