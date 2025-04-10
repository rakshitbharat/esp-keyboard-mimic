import * as React from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
}

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const add = React.useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: String(Date.now()) }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, add, dismiss };
}
