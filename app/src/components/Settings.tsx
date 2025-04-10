import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Settings2, Wifi, Bluetooth, Battery } from 'lucide-react';
import { useDeviceStore } from '@/store/deviceStore';

export const Settings = () => {
  const { isConnected, batteryLevel, deviceName } = useDeviceStore();

  return (
    <Card className="w-80 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Button size="icon" variant="ghost">
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Connection</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bluetooth className="h-4 w-4" />
              <span>Bluetooth</span>
            </div>
            <Switch checked={isConnected} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Typing Speed</h3>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Device Info</h3>
          <div className="text-sm text-muted-foreground">
            <p>Name: {deviceName}</p>
            <p>Battery: {batteryLevel}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
