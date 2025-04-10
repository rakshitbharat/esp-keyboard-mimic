import { create } from "zustand";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

interface ToastStore {
  toasts: Toast[];
  toast: {
    (data: Omit<Toast, "id">): void;
    error: (data: Omit<Toast, "id" | "variant">) => void;
    success: (data: Omit<Toast, "id" | "variant">) => void;
  };
  dismiss: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  toast: Object.assign(
    (data: Omit<Toast, "id">) =>
      set((state) => ({
        toasts: [...state.toasts, { ...data, id: String(Date.now()) }],
      })),
    {
      error: (data: Omit<Toast, "id" | "variant">) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { ...data, id: String(Date.now()), variant: "destructive" },
          ],
        })),
      success: (data: Omit<Toast, "id" | "variant">) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { ...data, id: String(Date.now()), variant: "success" },
          ],
        })),
    }
  ),
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
