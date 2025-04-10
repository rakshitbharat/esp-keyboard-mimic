import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Keyboard, Clock, Wifi, RefreshCw, Power } from "lucide-react";

export const DeviceSettings = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Device Settings</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Keyboard className="w-4 h-4" />
              <Label htmlFor="typing-speed">Typing Speed</Label>
            </div>
            <Slider
              id="typing-speed"
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <Label htmlFor="random-delay">Random Delay</Label>
            </div>
            <Switch id="random-delay" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4" />
              <Label htmlFor="auto-connect">Auto Connect</Label>
            </div>
            <Switch id="auto-connect" />
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Settings
            </Button>
            <Button variant="destructive" className="w-full">
              <Power className="w-4 h-4 mr-2" />
              Factory Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
