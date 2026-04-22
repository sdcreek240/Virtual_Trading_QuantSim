import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const { resetPortfolio } = usePortfolio() || {};

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // LOAD SETTINGS
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotif = localStorage.getItem("notifications");

    if (savedTheme) setDarkMode(savedTheme === "dark");
    if (savedNotif) setNotifications(savedNotif === "true");
  }, []);

  // 🌗 TOGGLE THEME
  function toggleTheme() {
    const newMode = !darkMode;
    setDarkMode(newMode);

    const root = document.documentElement;

    if (newMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function handleResetPortfolio() {
    if (!resetPortfolio) return;

    const confirmReset = window.confirm(
      "Reset portfolio to $10,000? This cannot be undone."
    );

    if (confirmReset) {
      resetPortfolio();
    }
  }

  function clearWatchlist() {
    localStorage.removeItem("watchlist");
    alert("Watchlist cleared");
  }

  return (
    <div className="p-6 space-y-6 page-fade">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Manage your preferences
        </p>
      </div>

      {/* PROFILE */}
      <div className="glass-card p-5 space-y-3">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Profile
        </h2>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Username
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            {user?.username || "Guest"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Email
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            {user?.email || "N/A"}
          </p>
        </div>
      </div>

      {/* PREFERENCES */}
      <div className="glass-card p-5 space-y-4">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Preferences
        </h2>

        {/* THEME */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">
            Theme
          </span>

          <button
            onClick={toggleTheme}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
              ${
                darkMode
                  ? "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {darkMode ? "Dark" : "Light"}
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">
            Notifications
          </span>

          <button
            onClick={() => {
              const newValue = !notifications;
              setNotifications(newValue);
              localStorage.setItem("notifications", newValue);
            }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
              ${
                notifications
                  ? "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {notifications ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* DATA */}
      <div className="glass-card p-5 space-y-4">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Data
        </h2>

        <button
          onClick={handleResetPortfolio}
          className="
            w-full py-2 rounded-lg
            bg-yellow-100 text-yellow-600
            hover:bg-yellow-200
            transition font-medium
          "
        >
          Reset Portfolio
        </button>

        <button
          onClick={clearWatchlist}
          className="
            w-full py-2 rounded-lg
            bg-pink-100 text-pink-500
            hover:bg-pink-200
            transition font-medium
          "
        >
          Clear Watchlist
        </button>
      </div>

      {/* ACCOUNT */}
      <div className="glass-card p-5">
        <button
          onClick={logout}
          className="
            w-full py-2 rounded-lg
            bg-gray-200 text-gray-800
            hover:bg-gray-300
            dark:bg-white/10 dark:text-white dark:hover:bg-white/20
            transition font-medium
          "
        >
          Logout
        </button>
      </div>

    </div>
  );
}