interface IpcApi {
  connectDevice: () => Promise<void>;
  disconnectDevice: () => Promise<void>;
  sendText: (text: string) => Promise<void>;
  updateSettings: (settings: DeviceSettings) => Promise<void>;
  onConnectionStatus: (callback: (status: boolean) => void) => void;
  onTypingStatus: (
    callback: (status: { typing: boolean; progress?: number }) => void
  ) => void;
  onBatteryStatus: (callback: (level: number) => void) => void;
}

interface DeviceSettings {
  typingSpeed: number;
  randomDelay: boolean;
  delayRange: [number, number];
  keyboardLayout: string;
  autoConnect: boolean;
}

declare global {
  interface Window {
    electronAPI: IpcApi;
  }
}
