import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ui/ConfirmModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="h-16 flex items-center justify-between px-6 bg-[#0A0F1F]/80 backdrop-blur border-b border-white/10">
        {/* Logo - minimal icon */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TN</span>
          </div>
        </Link>

        {/* Right side */}
        {user && (
          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-2 rounded-lg border border-white/20 hover:border-red-500 hover:text-red-400 text-sm transition"
          >
            Logout
          </button>
        )}
      </nav>

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
    </>
  );
};

export default Navbar;
