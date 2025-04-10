declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
  }
}

interface AppConfig {
  deviceName: string;
  typingSpeed: number;
  randomDelay: boolean;
  delayRange: [number, number];
  keyboardLayout: string;
  autoConnect: boolean;
  theme: "light" | "dark" | "system";
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

export type { AppConfig };
