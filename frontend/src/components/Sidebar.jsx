import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Star,
  Settings,
} from "lucide-react";

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const items = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Portfolio", icon: Briefcase },
    { name: "Markets", icon: TrendingUp },
    { name: "Watchlist", icon: Star },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`
        h-screen 
        ${hovered ? "w-56" : "w-16"}
        bg-white/5 backdrop-blur-md
        border-r border-white/10
        transition-all duration-300 ease-in-out
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className="p-4 font-bold text-sm border-b border-white/10">
        {hovered ? "TiffEx Trading" : "TX"}
      </div>

      <div className="mt-6 space-y-2">

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <div
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`
                flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer

                transition-all duration-200

                ${isActive
                  ? "bg-purple-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  : "hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                }
              `}
            >
              <Icon size={20} />

              {hovered && (
                <span className="text-sm">
                  {item.name}
                </span>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Sidebar;