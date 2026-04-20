import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // load session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("af_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // REGISTER
  function register(username, email, password) {
    const users = JSON.parse(localStorage.getItem("af_users") || "[]");

    const exists = users.find((u) => u.username === username);
    if (exists) return { error: "Username already exists" };

    const newUser = { username, email, password };
    users.push(newUser);

    localStorage.setItem("af_users", JSON.stringify(users));

    return { success: true };
  }

  // LOGIN
  function login(username, password) {
    const users = JSON.parse(localStorage.getItem("af_users") || "[]");

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) return { error: "Invalid credentials" };

    const sessionUser = { username: found.username, email: found.email };

    setUser(sessionUser);
    localStorage.setItem("af_user", JSON.stringify(sessionUser));

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