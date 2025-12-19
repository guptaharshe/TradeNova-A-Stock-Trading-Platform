import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../dashboard/DashboardLayout";

// Route guard
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Markets from "../pages/Markets";
import Orders from "../pages/Orders";
import Portfolio from "../pages/Portfolio";
import Watchlist from "../pages/Watchlist";
import News from "../pages/News";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

// Dashboard
import DashboardHome from "../dashboard/DashboardHome";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== LANDING PAGE (NO NAVBAR) ===== */}
        <Route path="/" element={<Landing />} />

        {/* ===== AUTH PAGES ===== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* ===== APP (PROTECTED + DASHBOARD LAYOUT) ===== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/news" element={<News />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
