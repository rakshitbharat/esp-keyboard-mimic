import { BrowserWindow, ipcMain } from "electron";
import {
  DEVICE_SCAN_CHANNEL,
  DEVICE_CONNECT_CHANNEL,
  DEVICE_DISCONNECT_CHANNEL,
  DEVICE_STATUS_CHANNEL,
  DEVICE_TYPE_CHANNEL,
} from "./device-channels";

export function addDeviceEventListeners(mainWindow: BrowserWindow) {
  let isConnected = false;

  ipcMain.handle(DEVICE_SCAN_CHANNEL, async () => {
    // TODO: Implement actual device scanning
    // For now, return mock data
    return [
      { id: "device1", name: "ESP32 Device 1" },
      { id: "device2", name: "ESP32 Device 2" },
    ];
  });

  ipcMain.handle(DEVICE_CONNECT_CHANNEL, async (_, deviceId: string) => {
    // TODO: Implement actual device connection
    isConnected = true;
    mainWindow.webContents.send(DEVICE_STATUS_CHANNEL, isConnected);
    return true;
  });

  ipcMain.handle(DEVICE_DISCONNECT_CHANNEL, async () => {
    // TODO: Implement actual device disconnection
    isConnected = false;
    mainWindow.webContents.send(DEVICE_STATUS_CHANNEL, isConnected);
    return true;
  });

  ipcMain.handle(DEVICE_STATUS_CHANNEL, () => {
    return isConnected;
  });

  ipcMain.handle(DEVICE_TYPE_CHANNEL, async (_, text: string) => {
    // TODO: Implement actual typing functionality
    console.log("Typing:", text);
    return true;
  });
}
