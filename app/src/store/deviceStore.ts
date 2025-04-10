import { create } from "zustand";

export interface DeviceState {
  isConnected: boolean;
  batteryLevel: number;
  deviceName: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  setConnection: (status: boolean) => void;
  setBatteryLevel: (level: number) => void;
  setError: (error: string | null) => void;
  updateBatteryLevel: (level: number) => void;
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
  isConnected: false,
  batteryLevel: 100,
  deviceName: null,
  error: null,
  connect: async () => {
    try {
      await window.electronAPI.connectDevice();
      set({ isConnected: true });
    } catch (error) {
      set({ error: String(error) });
    }
  },
  disconnect: async () => {
    set({ isConnected: false });
  },
  setConnection: (status) => set({ isConnected: status }),
  setBatteryLevel: (level) => set({ batteryLevel: level }),
  setError: (error) => set({ error }),
  updateBatteryLevel: (level) => set({ batteryLevel: level }),
}));
