import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AnimatePresence, motion } from "framer-motion";

function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">

      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto p-6">

        <AnimatePresence mode="wait">

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>

        </AnimatePresence>

      </div>
    </div>
  );
}

export default MainLayout;