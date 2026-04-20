import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // only for register
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit() {
    setError("");

    // LOGIN FLOW
    if (isLogin) {
      const res = login(username, password);

      if (res?.error) {
        setError(res.error);
        return;
      }

      navigate("/");
      return;
    }

    // REGISTER FLOW
    const res = register(username, email, password);

    if (res?.error) {
      setError(res.error);
      return;
    }

    // auto-login after register
    login(username, password);
    navigate("/");
  }

  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-[#0b0f1a]
    ">

      {/* CARD */}
      <div className="
        w-96 p-8 rounded-2xl

        bg-white/5 backdrop-blur-xl
        border border-white/10

        shadow-[0_0_80px_rgba(99,102,241,0.25)]
        transition-all
      ">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6">
          TiffEx Trading
        </h1>

        {/* TOGGLE */}
        <div className="flex justify-center gap-6 mb-6">

          <button
            onClick={() => setIsLogin(true)}
            className={`transition ${
              isLogin ? "text-cyan-400" : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`transition ${
              !isLogin ? "text-cyan-400" : "text-gray-400"
            }`}
          >
            Register
          </button>

        </div>

        {/* USERNAME */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="
            w-full p-3 mb-3 rounded-lg
            bg-black/30 border border-white/10
            outline-none text-white
          "
        />

        {/* EMAIL (REGISTER ONLY) */}
        {!isLogin && (
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="
              w-full p-3 mb-3 rounded-lg
              bg-black/30 border border-white/10
              outline-none text-white
            "
          />
        )}

        {/* PASSWORD */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="
            w-full p-3 mb-4 rounded-lg
            bg-black/30 border border-white/10
            outline-none text-white
          "
        />

        {/* ERROR */}
        {error && (
          <p className="text-pink-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="
            w-full py-2 rounded-lg font-semibold

            bg-gradient-to-r from-cyan-500 to-indigo-500
            hover:scale-[1.03]
            transition-all duration-200

            shadow-[0_0_25px_rgba(34,211,238,0.25)]
          "
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

      </div>
    </div>
  );
}

export default Auth;