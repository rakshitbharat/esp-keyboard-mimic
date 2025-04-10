import { create } from "zustand";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: "default" | "success" | "error";
}

interface ToastStore {
  toasts: Toast[];
  toast: (data: Omit<Toast, "id">) => void;
  error: (data: Omit<Toast, "id">) => void;
  success: (data: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  toast: (data) =>
    set((state) => ({
      toasts: [...state.toasts, { ...data, id: String(Date.now()) }],
    })),
  error: (data) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...data, id: String(Date.now()), type: "error" },
      ],
    })),
  success: (data) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...data, id: String(Date.now()), type: "success" },
      ],
    })),
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
