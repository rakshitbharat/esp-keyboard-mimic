import React, { createContext, useContext, useEffect, useState } from "react";
import { useDeviceStore } from "@/store/deviceStore";
import { useDevice } from "@/hooks/useDevice";

interface DeviceContextType {
  isConnected: boolean;
  isTyping: boolean;
  batteryLevel: number;
  deviceName: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceStore = useDeviceStore();
  const { deviceService } = useDevice();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    deviceService.onTypingStatus((status) => {
      setIsTyping(status.typing);
    });
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        ...deviceStore,
        isTyping,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
