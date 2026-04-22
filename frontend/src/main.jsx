import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ToastProvider } from "./context/ToastContext";

import { Toaster } from "react-hot-toast";

// 🌗 APPLY SAVED THEME BEFORE RENDER
const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PortfolioProvider>
          <ToastProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0b0f1a",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                },
              }}
            />
          </ToastProvider>
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);