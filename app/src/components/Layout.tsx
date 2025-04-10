import React from "react";
import { FloatingWindow } from "./FloatingWindow";
import { SnippetManager } from "./SnippetManager";
import { DeviceSettings } from "./DeviceSettings";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { DeviceStatus } from "./DeviceStatus";
import { ThemeToggle } from "./theme/ThemeToggle";

export const Layout = () => {
  const [text, setText] = React.useState("");
  const { isConnected, connect } = useDeviceStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-full items-center justify-between">
          <h1 className="text-xl font-bold">ESP Keyboard Mimic</h1>
          <div className="flex items-center gap-4">
            <DeviceStatus />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container pt-20 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          <FloatingWindow
            isConnected={isConnected}
            text={text}
            onConnect={connect}
            onTextChange={setText}
            onType={() => {
              /* implement typing logic */
            }}
            onClear={() => setText("")}
          />
          <KeyboardShortcuts />
        </div>
        <div className="md:col-span-4 space-y-4">
          <SnippetManager />
          <DeviceSettings />
        </div>
      </div>
    </div>
  );
};
