// Skeleton Components for Loading States

export default function Skeleton({
    className = "",
    variant = "text",
    width,
    height,
}) {
    const variants = {
        text: "h-4 rounded",
        title: "h-6 rounded",
        avatar: "h-12 w-12 rounded-full",
        card: "h-32 rounded-xl",
        chart: "h-64 rounded-xl",
    };

    const baseClasses = "animate-pulse bg-white/10";

    const style = {};
    if (width) style.width = width;
    if (height) style.height = height;

    return (
        <div
            className={`${baseClasses} ${variants[variant]} ${className}`}
            style={style}
        />
    );
}

// Premium Card Skeleton
export function CardSkeleton({ className = "" }) {
    return (
        <div className={`bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 rounded-2xl p-5 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <Skeleton variant="text" width="40%" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton variant="title" width="60%" className="mb-2" />
            <Skeleton variant="text" width="30%" />
        </div>
    );
}

// Skeleton chart preset
export function SkeletonChart() {
    return (
        <div className="bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 rounded-2xl p-5">
            <Skeleton variant="text" width="30%" className="mb-4" />
            <div className="h-64 flex items-end gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 animate-pulse bg-white/10 rounded-t-lg"
                        style={{ height: `${30 + Math.random() * 60}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

// Stock Card Skeleton
export function StockCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-12 rounded-lg" />
            </div>
            <Skeleton className="h-7 w-24 mb-3" />
            <div className="flex gap-2 mb-4">
                <Skeleton className="h-5 w-20 rounded-lg" />
                <Skeleton className="h-5 w-24 rounded-lg" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
        </div>
    );
}

// News Card Skeleton
export function NewsCardSkeleton() {
    return (
        <div className="bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 rounded-2xl p-5">
            <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 w-16 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-4" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-2/3 mb-4" />
            <div className="flex gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    );
}

// Holdings Table Skeleton
export function HoldingsTableSkeleton() {
    return (
        <div className="bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5">
                <Skeleton className="h-5 w-24" />
            </div>
            <div className="p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-4">
                            <div>
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                        <div className="text-right">
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Dashboard Page Skeleton
export function DashboardSkeleton() {
    return (
        <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
            {/* Title */}
            <Skeleton className="h-12 w-48 mb-8" />

            {/* Status Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>

            {/* Chart */}
            <SkeletonChart />
        </div>
    );
}

// Markets Page Skeleton
export function MarketsSkeleton() {
    return (
        <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-8 w-32 rounded-full" />
            </div>

            {/* Sentiment Banner */}
            <Skeleton className="h-14 w-full rounded-2xl mb-6" />

            {/* Sector Tabs */}
            <div className="flex gap-2 mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-20 rounded-xl" />
                ))}
            </div>

            {/* Search + Filters */}
            <div className="flex gap-4 mb-6">
                <Skeleton className="h-12 flex-1 rounded-xl" />
                <Skeleton className="h-12 w-32 rounded-xl" />
            </div>

            {/* Stock Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <StockCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

// Portfolio Page Skeleton
export function PortfolioSkeleton() {
    return (
        <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
            <Skeleton className="h-12 w-40 mb-8" />

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>

            {/* Holdings Table */}
            <HoldingsTableSkeleton />
        </div>
    );
}

// News Page Skeleton  
export function NewsSkeleton() {
    return (
        <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
            <Skeleton className="h-12 w-32 mb-8" />

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-xl" />
                ))}
            </div>

            {/* Search */}
            <Skeleton className="h-12 w-full rounded-xl mb-6" />

            {/* News Cards */}
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <NewsCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
