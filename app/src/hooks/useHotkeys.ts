import { create } from "zustand";

interface Shortcut {
  id: string;
  name: string;
  keys: string;
  description: string;
}

interface HotkeysStore {
  shortcuts: Shortcut[];
  addShortcut: (shortcut: Omit<Shortcut, "id">) => void;
  removeShortcut: (id: string) => void;
}

export const useHotkeys = create<HotkeysStore>((set) => ({
  shortcuts: [],
  addShortcut: (shortcut) =>
    set((state) => ({
      shortcuts: [
        ...state.shortcuts,
        { ...shortcut, id: Date.now().toString() },
      ],
    })),
  removeShortcut: (id) =>
    set((state) => ({
      shortcuts: state.shortcuts.filter((s) => s.id !== id),
    })),
}));
