import { create } from "zustand";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: "default" | "success" | "error";
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: String(Date.now()) }],
    })),
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
