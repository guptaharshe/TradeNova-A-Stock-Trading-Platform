import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Don't show breadcrumbs on dashboard home
    if (pathnames.length <= 1) return null;

    const formatLabel = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
    };

    return (
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <span key={name} className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {isLast ? (
                            <span className="text-white font-medium">{formatLabel(name)}</span>
                        ) : (
                            <Link to={routeTo} className="hover:text-white transition">
                                {formatLabel(name)}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
