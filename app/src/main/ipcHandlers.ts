import { ipcMain, BrowserWindow } from "electron";
import { deviceManager } from "./deviceManager";

interface DeviceManager {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendText: (text: string) => Promise<void>;
  updateSettings: (settings: DeviceSettings) => Promise<void>;
  on: (event: string, callback: (data: any) => void) => void;
}

export function setupIpcHandlers(deviceManager: DeviceManager) {
  ipcMain.handle("connect-device", async () => {
    return await deviceManager.connect();
  });

  ipcMain.handle("disconnect-device", async () => {
    return await deviceManager.disconnect();
  });

  deviceManager.on("connection-status", (status: boolean) => {
    // Send to all windows
  });

  deviceManager.on(
    "typing-status",
    (status: { typing: boolean; progress?: number }) => {
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send("typing-status", status);
      });
    }
  );

  ipcMain.handle("send-text", async (_, text: string) => {
    try {
      await deviceManager.sendText(text);
      return true;
    } catch (error) {
      console.error("Error sending text:", error);
      throw error;
    }
  });

  ipcMain.handle("update-settings", async (_, settings: DeviceSettings) => {
    return await deviceManager.updateSettings(settings);
  });
}
