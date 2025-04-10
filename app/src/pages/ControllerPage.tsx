import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, Power, Settings, MinimizeIcon } from "lucide-react";
import { minimizeWindow } from "@/helpers/window_helpers";

interface Device {
  id: string;
  name: string;
}

export default function ControllerPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isTypingEnabled, setIsTypingEnabled] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Initialize connection status
    window.deviceControl.getStatus().then(setIsConnected);

    // Set up listeners
    window.deviceControl.onStatusChange(setIsConnected);
    window.deviceControl.onTypingToggle(setIsTypingEnabled);

    return () => {
      // Clean up listeners if needed
      window.deviceControl.disconnect();
    };
  }, []);

  const handleScanConnect = async () => {
    try {
      const foundDevices = await window.deviceControl.scan();
      setDevices(foundDevices);

      if (foundDevices.length > 0) {
        // Auto-connect to the first device found
        await window.deviceControl.connect(foundDevices[0].id);
      }
    } catch (error) {
      console.error("Failed to scan/connect:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await window.deviceControl.disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const handleToggleTyping = () => {
    setIsTypingEnabled(!isTypingEnabled);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Status Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-xs">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleDisconnect}
          >
            <Power className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={minimizeWindow}
          >
            <MinimizeIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-background/50 flex-1 rounded-lg border p-2">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleScanConnect}
            disabled={isConnected}
          >
            Scan & Connect
          </Button>
          <Button
            variant={isTypingEnabled ? "destructive" : "default"}
            className="w-full"
            onClick={handleToggleTyping}
            disabled={!isConnected}
          >
            {isTypingEnabled ? "Stop Typing" : "Start Typing"}
          </Button>
        </div>
      </div>
    </div>
  );
}
