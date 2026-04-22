import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Star,
  Settings,
} from "lucide-react";

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  const items = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Portfolio", icon: Briefcase, path: "/portfolio" },
    { name: "Markets", icon: TrendingUp, path: "/markets" },
    { name: "Watchlist", icon: Star, path: "/watchlist" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`
        h-screen
        ${hovered ? "w-56" : "w-16"}
        bg-white/5 backdrop-blur-md
        border-r border-white/10
        transition-all duration-300
        flex flex-col
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* 🔥 LOGO */}
      <div className="p-4 border-b border-white/10 flex justify-center">
        <img
          src={hovered ? "/logo-full.png" : "/logo-tx.png"}
          className={`transition-all ${hovered ? "w-32" : "w-8"}`}
        />
      </div>

      {/* NAV */}
      <div className="mt-6 space-y-2 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`
                  flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-500/20 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      : "hover:bg-purple-500/10"
                  }
                `}
              >
                <Icon size={20} className="text-white" />

                {hovered && (
                  <span className="text-sm text-white">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default Sidebar;