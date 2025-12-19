import { useState, useEffect, useMemo } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import ProfileDropdown from "../components/ui/ProfileDropdown";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ui/ConfirmModal";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/navigation/BottomNav";
import SearchModal from "../components/ui/SearchModal";
import SessionTimeout from "../components/auth/SessionTimeout";

const DashboardLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // All navigation items
  const allNavItems = [
    { to: "/markets", label: "Markets" },
    { to: "/orders", label: "Orders" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/watchlist", label: "Watchlist" },
    { to: "/news", label: "News" },
  ];

  // Dynamic nav items based on current page
  const navItems = useMemo(() => {
    const currentPath = location.pathname;

    // Pages that show all nav items (Dashboard, Watchlist, News)
    const fullNavPages = ["/dashboard", "/", "/watchlist", "/news"];

    if (fullNavPages.includes(currentPath)) {
      return allNavItems;
    }

    // If on any other page, replace that page with Dashboard at the start
    const filteredItems = allNavItems.filter(item => item.to !== currentPath);
    return [{ to: "/dashboard", label: "Dashboard" }, ...filteredItems];
  }, [location.pathname]);

  // Keyboard shortcut: Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  // Nav link styling - emerald accent with glow
  const navLinkClass = ({ isActive }) =>
    `text-lg font-medium px-4 py-2 rounded-md transition-all duration-200 ${isActive
      ? "text-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
      : "text-gray-400 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-theme-primary text-theme-primary">
      {/* Session Timeout Monitor */}
      <SessionTimeout />

      {/* Main Navbar */}
      <header className="sticky top-0 z-30 bg-[#0D1321] border-b border-white/10">
        <div className="flex items-center px-4 md:px-6 py-3 gap-3">

          {/* Logo */}
          <NavLink to="/dashboard" className="shrink-0 mr-6">
            <h1 className="text-xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Trade
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
                Nova
              </span>
            </h1>
          </NavLink>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search Bar - Expands to fill available space */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="flex items-center gap-3 px-5 py-2.5 flex-1 max-w-[420px] rounded-full bg-[#1A2238] text-sm text-gray-500 hover:bg-[#1E2844] transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-left">Search stocks...</span>
          </button>

          {/* Profile Dropdown */}
          <ProfileDropdown userName={user?.name} />

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content area - Full width now */}
      <main className="flex-1 overflow-auto pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        variant="danger"
      />
    </div>
  );
};

export default DashboardLayout;
