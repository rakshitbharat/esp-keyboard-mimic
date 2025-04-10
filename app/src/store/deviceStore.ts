import { create } from "zustand";

interface DeviceState {
  isConnected: boolean;
  batteryLevel: number;
  deviceName: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  updateBatteryLevel: (level: number) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  isConnected: false,
  batteryLevel: 100,
  deviceName: null,
  error: null,
  connect: async () => {
    try {
      // Implement connection logic here
      set({ isConnected: true, error: null });
    } catch (error) {
      set({ error: "Failed to connect" });
    }
  },
  disconnect: async () => {
    try {
      // Implement disconnection logic here
      set({ isConnected: false, deviceName: null });
    } catch (error) {
      set({ error: "Failed to disconnect" });
    }
  },
  updateBatteryLevel: (level) => set({ batteryLevel: level }),
}));
