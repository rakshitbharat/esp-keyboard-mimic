import { ipcRenderer } from "electron";

export class DeviceService {
  private connectionTimeout: number = 30000; // 30 seconds

  async connect(): Promise<boolean> {
    try {
      const result = await Promise.race([
        ipcRenderer.invoke("connect-device"),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Connection timeout")),
            this.connectionTimeout
          )
        ),
      ]);
      return result as boolean;
    } catch (error) {
      console.error("Connection failed:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await ipcRenderer.invoke("disconnect-device");
  }

  onConnectionStatus(callback: (status: boolean) => void): void {
    ipcRenderer.on("connection-status", (_, status) => callback(status));
  }

  onBatteryStatus(callback: (level: number) => void): void {
    ipcRenderer.on("battery-status", (_, level) => callback(level));
  }

  async sendText(text: string): Promise<void> {
    if (!text.trim()) return;

    try {
      await ipcRenderer.invoke("send-text", text);
    } catch (error) {
      console.error("Failed to send text:", error);
      throw error;
    }
  }

  onTypingStatus(
    callback: (status: { typing: boolean; progress?: number }) => void
  ): void {
    ipcRenderer.on("typing-status", (_, status) => callback(status));
  }
}

export const deviceService = new DeviceService();
