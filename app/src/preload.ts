import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  connectDevice: () => ipcRenderer.invoke("connect-device"),
  sendText: (text: string) => ipcRenderer.invoke("send-text", text),
  onConnectionStatus: (callback: (status: boolean) => void) => {
    ipcRenderer.on("connection-status", (_, status) => callback(status));
    // Return cleanup function
    return () => {
      ipcRenderer.removeAllListeners("connection-status");
    };
  },
  onTypingStatus: (
    callback: (status: { typing: boolean; progress?: number }) => void
  ) => {
    ipcRenderer.on("typing-status", (_, status) => callback(status));
    // Return cleanup function
    return () => {
      ipcRenderer.removeAllListeners("typing-status");
    };
  },
});
