import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
