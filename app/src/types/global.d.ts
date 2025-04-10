declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
  }
}

export interface AppConfig {
  deviceName: string;
  typingSpeed: number;
  typingDelay: number;
  useRandomDelay: boolean;
  randomDelayRange: [number, number];
  keyboardLayout: string;
  autoConnect: boolean;
  theme: "light" | "dark" | "system";
}

export interface DeviceSettings {
  typingSpeed: number;
  typingDelay: number;
  useRandomDelay: boolean;
  randomDelayRange: [number, number];
  keyboardLayout: string;
  autoConnect: boolean;
}

export declare global {
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
