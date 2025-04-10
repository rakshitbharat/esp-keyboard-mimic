import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  connectDevice: () => ipcRenderer.invoke('connect-device'),
  sendText: (text: string) => ipcRenderer.invoke('send-text', text),
  onConnectionStatus: (callback: (status: boolean) => void) => 
    ipcRenderer.on('connection-status', (_event, status) => callback(status)),
  onTypingStatus: (callback: (status: { typing: boolean; progress?: number }) => void) =>
    ipcRenderer.on('typing-status', (_event, status) => callback(status))
});
