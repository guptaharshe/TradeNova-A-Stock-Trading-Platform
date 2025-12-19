import { useState } from "react";

export default function SwipeableItem({
    children,
    onSwipeLeft,
    onSwipeRight,
    leftAction,
    rightAction,
    leftColor = "bg-red-600",
    rightColor = "bg-green-600",
}) {
    const [startX, setStartX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const threshold = 80;

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;

        // Limit swipe distance
        const limitedDiff = Math.max(-150, Math.min(150, diff));
        setOffsetX(limitedDiff);
    };

    const handleTouchEnd = () => {
        setIsSwiping(false);

        if (offsetX > threshold && onSwipeRight) {
            onSwipeRight();
        } else if (offsetX < -threshold && onSwipeLeft) {
            onSwipeLeft();
        }

        setOffsetX(0);
    };

    return (
        <div className="relative overflow-hidden rounded-xl">
            {/* Left action background */}
            {rightAction && (
                <div className={`absolute inset-y-0 left-0 w-24 ${rightColor} flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">{rightAction}</span>
                </div>
            )}

            {/* Right action background */}
            {leftAction && (
                <div className={`absolute inset-y-0 right-0 w-24 ${leftColor} flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">{leftAction}</span>
                </div>
            )}

            {/* Swipeable content */}
            <div
                className="relative bg-[#1A2238] transition-transform duration-200"
                style={{
                    transform: `translateX(${offsetX}px)`,
                    transition: isSwiping ? "none" : "transform 0.2s ease-out"
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {children}
            </div>
        </div>
    );
}
