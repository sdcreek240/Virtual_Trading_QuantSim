import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">

      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto p-6">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;