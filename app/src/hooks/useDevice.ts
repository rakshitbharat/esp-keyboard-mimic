import { useEffect } from "react";
import { useDeviceStore } from "@/store/deviceStore";
import { deviceService } from "@/services/DeviceService";

export const useDevice = () => {
  const { setConnection, updateBatteryLevel, setError } = useDeviceStore();

  useEffect(() => {
    deviceService.onConnectionStatus((status) => {
      setConnection(status);
    });

    deviceService.onBatteryStatus((level) => {
      updateBatteryLevel(level);
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return { deviceService };
};
