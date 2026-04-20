import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-transparent text-white">

      <Sidebar />

      <div className="flex-1">

        {/* TOP BAR */}
        <div className="
          px-6 py-4 
          border-b border-white/10
          bg-white/5 backdrop-blur-md
        ">
          <h1 className="text-xl font-bold drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            TiffEx Trading
          </h1>
        </div>

        <Outlet />

      </div>
    </div>
  );
}

export default MainLayout;