import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  function handleRegister() {
    if (!username || !email || !password) return;

    const res = register(username, email, password);

    if (res.error) {
      alert(res.error);
    } else {
      alert("Account created! Please login.");
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-white">

      <div className="w-96 p-8 glass-card space-y-4">

        <h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10"
        />

        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
        >
          Register
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;