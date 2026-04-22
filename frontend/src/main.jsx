import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🌗 APPLY SAVED THEME BEFORE RENDER
const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PortfolioProvider>
        <App />
        <Toaster position="top-right" />
      </PortfolioProvider>
    </AuthProvider>
  </BrowserRouter>
);