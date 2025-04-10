import { create } from "zustand";
import { deviceService } from "@/services/DeviceService";

interface DeviceState {
  isConnected: boolean;
  batteryLevel: number;
  deviceName: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  updateBatteryLevel: (level: number) => void;
  setError: (error: string | null) => void;
  reconnect: () => Promise<void>;
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
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
  setError: (error) => set({ error }),

  reconnect: async () => {
    try {
      set({ error: null });
      await deviceService.connect();
      set({ isConnected: true });
    } catch (error) {
      set({ error: error.message, isConnected: false });
    }
  },
}));
