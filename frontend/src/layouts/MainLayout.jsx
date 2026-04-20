import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">

      <Sidebar />

      <main
        className="
          pt-16 md:pt-0
          ml-16 md:ml-16
          md:group-hover:ml-56

          p-6
          transition-all duration-300
        "
      >
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;