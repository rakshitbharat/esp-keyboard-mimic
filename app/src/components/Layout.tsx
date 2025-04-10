import React from "react";
import { FloatingWindow } from "./FloatingWindow";
import { SnippetManager } from "./SnippetManager";
import { DeviceSettings } from "./DeviceSettings";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { DeviceStatus } from "./DeviceStatus";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 flex items-start justify-between p-4">
        <div className="space-y-4">
          <FloatingWindow />
          <KeyboardShortcuts />
        </div>
        <div className="space-y-4">
          <DeviceStatus />
          <SnippetManager />
          <DeviceSettings />
        </div>
      </div>
    </div>
  );
};
