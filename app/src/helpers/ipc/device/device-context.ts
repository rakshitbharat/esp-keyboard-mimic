import {
  DEVICE_SCAN_CHANNEL,
  DEVICE_CONNECT_CHANNEL,
  DEVICE_DISCONNECT_CHANNEL,
  DEVICE_STATUS_CHANNEL,
  DEVICE_TYPE_CHANNEL,
  DEVICE_TOGGLE_TYPING_CHANNEL,
} from "./device-channels";

export function exposeDeviceContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");

  contextBridge.exposeInMainWorld("deviceControl", {
    scan: () => ipcRenderer.invoke(DEVICE_SCAN_CHANNEL),
    connect: (deviceId: string) =>
      ipcRenderer.invoke(DEVICE_CONNECT_CHANNEL, deviceId),
    disconnect: () => ipcRenderer.invoke(DEVICE_DISCONNECT_CHANNEL),
    getStatus: () => ipcRenderer.invoke(DEVICE_STATUS_CHANNEL),
    type: (text: string) => ipcRenderer.invoke(DEVICE_TYPE_CHANNEL, text),
    onStatusChange: (callback: (status: boolean) => void) =>
      ipcRenderer.on(DEVICE_STATUS_CHANNEL, (_, status) => callback(status)),
    onTypingToggle: (callback: (enabled: boolean) => void) =>
      ipcRenderer.on(DEVICE_TOGGLE_TYPING_CHANNEL, (_, enabled) =>
        callback(enabled),
      ),
  });
}
