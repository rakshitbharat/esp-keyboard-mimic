import React from "react";
import { Battery, BatteryCharging, BatteryWarning } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import { useDeviceStore } from "@/store/deviceStore";
import { deviceService } from "@/services/DeviceService";
import { useToast } from "./ui/use-toast";

export const DeviceStatus = () => {
  const { isConnected, batteryLevel, error } = useDeviceStore();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await deviceService.connect();
      toast({
        title: "Device Connected",
        description: "Successfully connected to ESP Keyboard Mimic",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message,
      });
    }
  };

  const getBatteryIcon = () => {
    if (batteryLevel <= 20) return <BatteryWarning className="text-red-500" />;
    if (batteryLevel <= 50) return <Battery className="text-yellow-500" />;
    return <BatteryCharging className="text-green-500" />;
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip content={`Battery: ${batteryLevel}%`}>
        <div className="flex items-center">
          {getBatteryIcon()}
          <span className="text-xs ml-1">{batteryLevel}%</span>
        </div>
      </Tooltip>

      <Button
        size="sm"
        variant={isConnected ? "default" : "outline"}
        onClick={handleConnect}
        className={isConnected ? "bg-green-500 hover:bg-green-600" : ""}
      >
        {isConnected ? "Connected" : "Connect Device"}
      </Button>
    </div>
  );
};
