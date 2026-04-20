import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Star,
  Settings,
  Menu,
} from "lucide-react";

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const items = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Portfolio", icon: Briefcase },
    { name: "Markets", icon: TrendingUp },
    { name: "Watchlist", icon: Star },
    { name: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0b0f1a] border-b border-white/10 flex items-center px-4 z-50">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-white"
        >
          <Menu />
        </button>

        <span className="ml-3 font-bold text-cyan-400">
          TiffEx Trading
        </span>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-40

          bg-white/5 backdrop-blur-xl
          border-r border-white/10

          transition-all duration-300 ease-in-out

          ${expanded ? "w-56" : "w-16"}

          md:w-16 md:hover:w-56
        `}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >

        {/* LOGO */}
        <div className="
          h-14 flex items-center justify-center
          border-b border-white/10
          text-cyan-400 font-bold
        ">
          {expanded ? "TiffEx Trading" : "TX"}
        </div>

        {/* MENU */}
        <div className="mt-6 space-y-2">

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;

            return (
              <div
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`
                  relative flex items-center gap-3
                  mx-2 px-3 py-2 rounded-lg
                  cursor-pointer

                  transition-all duration-200
                  group

                  ${
                    isActive
                      ? "bg-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.25)]"
                      : "hover:bg-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.18)] hover:scale-[1.03]"
                  }
                `}
              >

                {/* ACTIVE BAR */}
                {isActive && (
                  <div className="
                    absolute left-0 top-1 bottom-1 w-[3px]
                    bg-gradient-to-b from-cyan-400 to-indigo-500
                    rounded-full
                  " />
                )}

                {/* ICON */}
                <Icon
                  size={20}
                  className={`
                    transition-all duration-200

                    ${isActive ? "text-cyan-400" : "text-gray-300"}

                    group-hover:text-cyan-300
                    group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]
                  `}
                />

                {/* LABEL */}
                {expanded && (
                  <span
                    className={`
                      text-sm transition-all duration-200

                      ${isActive ? "text-white" : "text-gray-300"}
                    `}
                  >
                    {item.name}
                  </span>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </>
  );
}

export default Sidebar;