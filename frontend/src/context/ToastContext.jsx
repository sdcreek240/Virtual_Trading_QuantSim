import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type = "info") {
    const id = Date.now();

    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST CONTAINER */}
      <div className="fixed top-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              px-4 py-2 rounded-lg shadow-lg
              text-sm font-medium
              backdrop-blur-md
              animate-fade-in

              ${
                toast.type === "success"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/20"
                  : toast.type === "error"
                  ? "bg-pink-500/20 text-pink-400 border border-pink-400/20"
                  : "bg-white/10 text-white border border-white/10"
              }
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>

    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}