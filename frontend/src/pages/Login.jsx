import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    if (!email) return;

    login(email);
    navigate("/");
  }

  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-[#0b0f1a]
    ">

      <div className="
        w-96 p-8 rounded-2xl

        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl

        shadow-[0_0_60px_rgba(99,102,241,0.2)]
      ">

        <h1 className="text-3xl font-bold mb-6 text-center">
          TiffEx Trading
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Sign in to access your portfolio
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="
            w-full p-3 mb-4 rounded-lg
            bg-black/30 border border-white/10
            rounded-2xl
            outline-none
          "
        />

        <button
          onClick={handleLogin}
          className="
            w-full py-2 rounded-lg font-semibold

            bg-gradient-to-r from-cyan-500 to-indigo-500
            hover:scale-105 transition
          "
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;