export interface AppConfig {
  typingDelay: number;
  useRandomDelay: boolean;
  randomDelayRange: [number, number];
  windowBounds?: Electron.Rectangle;
  keyboardLayout: string;
  autoConnect: boolean;
}

declare global {
  interface Window {
    electronAPI: {
      connectDevice: () => Promise<void>;
      sendText: (text: string) => Promise<void>;
      onConnectionStatus: (callback: (status: boolean) => void) => void;
      onTypingStatus: (
        callback: (status: { typing: boolean; progress?: number }) => void
      ) => void;
    };
  }
}
