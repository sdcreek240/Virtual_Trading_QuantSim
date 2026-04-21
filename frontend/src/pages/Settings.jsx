import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 text-sm">
          Manage your account and preferences
        </p>
      </div>

      {/* USER CARD */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">

        <p className="text-gray-400 text-sm">Logged in as</p>

        <p className="text-xl font-bold">
          {user?.username || "Unknown User"}
        </p>

        <p className="text-gray-400 text-sm">
          {user?.email}
        </p>

      </div>

      {/* SETTINGS OPTIONS */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">

        <p className="font-bold">Account Actions</p>

        <button
          onClick={logout}
          className="
            px-4 py-2 rounded-lg
            bg-pink-500/20 text-pink-400
            hover:bg-pink-500/30
            transition
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}