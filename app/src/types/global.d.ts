export interface ElectronAPI {
  connectDevice: () => Promise<{ success: boolean; message: string }>;
  sendText: (text: string) => Promise<{ success: boolean; message?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
