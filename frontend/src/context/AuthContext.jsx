import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("af_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function login(username, password) {
    const users = JSON.parse(localStorage.getItem("af_users") || "[]");

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) return { error: "Invalid credentials" };

    const sessionUser = {
      username: found.username,
      email: found.email,
    };

    setUser(sessionUser);
    localStorage.setItem("af_user", JSON.stringify(sessionUser));

    return { success: true };
  }

  function register(username, email, password) {
    const users = JSON.parse(localStorage.getItem("af_users") || "[]");

    if (users.find((u) => u.username === username)) {
      return { error: "Username exists" };
    }

    users.push({ username, email, password });
    localStorage.setItem("af_users", JSON.stringify(users));

    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("af_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}