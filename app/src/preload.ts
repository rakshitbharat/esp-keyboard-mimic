import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  connectDevice: () => ipcRenderer.invoke("connect-device"),
  sendText: (text: string) => ipcRenderer.invoke("send-text", text),
  onConnectionStatus: (callback: (status: boolean) => void) =>
    ipcRenderer.on("connection-status", (_, status) => callback(status)),
  onTypingStatus: (
    callback: (status: { typing: boolean; progress?: number }) => void
  ) => ipcRenderer.on("typing-status", (_, status) => callback(status)),
});
