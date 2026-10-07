import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed right-3 top-6 z-50 flex w-[calc(100%-1.5rem)] max-w-xs flex-col gap-2 sm:right-4 sm:top-4 sm:w-72">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`animate-toast-in flex items-start gap-2 rounded-md border px-4 py-3 text-sm shadow-md ${
              t.type === "success"
                ? "border-teal/30 bg-teal-light text-teal-dark"
                : t.type === "error"
                ? "border-danger/30 bg-danger-light text-danger"
                : "border-primary/30 bg-primary-light text-primary-dark"
            }`}
          >
            <span
              className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                t.type === "success"
                  ? "bg-teal"
                  : t.type === "error"
                  ? "bg-danger"
                  : "bg-primary"
              }`}
            />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
