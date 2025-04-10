import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  theme: "light" | "dark" | "system";
  typingSpeed: number;
  randomDelay: boolean;
  autoConnect: boolean;
  windowPosition: { x: number; y: number };
  setTheme: (theme: "light" | "dark" | "system") => void;
  setTypingSpeed: (speed: number) => void;
  setRandomDelay: (enabled: boolean) => void;
  setAutoConnect: (enabled: boolean) => void;
  setWindowPosition: (x: number, y: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      typingSpeed: 50,
      randomDelay: false,
      autoConnect: true,
      windowPosition: { x: 0, y: 0 },
      setTheme: (theme) => set({ theme }),
      setTypingSpeed: (speed) => set({ typingSpeed: speed }),
      setRandomDelay: (enabled) => set({ randomDelay: enabled }),
      setAutoConnect: (enabled) => set({ autoConnect: enabled }),
      setWindowPosition: (x, y) => set({ windowPosition: { x, y } }),
    }),
    {
      name: "app-storage",
    }
  )
);
