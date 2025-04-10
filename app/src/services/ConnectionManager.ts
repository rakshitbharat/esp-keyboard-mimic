import { deviceService } from "./DeviceService";
import { useDeviceStore } from "@/store/deviceStore";
import { useToast } from "@/hooks/useToast";

export class ConnectionManager {
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 2000;
  private autoReconnectTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.setupConnectionMonitoring();
  }

  private setupConnectionMonitoring() {
    deviceService.onConnectionStatus((status) => {
      if (status) {
        this.reconnectAttempts = 0;
        this.clearAutoReconnectTimer();
      } else {
        this.handleDisconnection();
      }
    });
  }

  private handleDisconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.autoReconnectTimer = setTimeout(() => {
        this.attemptReconnect();
      }, this.reconnectDelay);
    }
  }

  private async attemptReconnect() {
    try {
      this.reconnectAttempts++;
      await deviceService.connect();
    } catch (error) {
      console.error("Reconnection attempt failed:", error);
      this.handleDisconnection();
    }
  }

  private clearAutoReconnectTimer() {
    if (this.autoReconnectTimer) {
      clearTimeout(this.autoReconnectTimer);
      this.autoReconnectTimer = null;
    }
  }

  public async connect() {
    try {
      await deviceService.connect();
    } catch (error) {
      console.error("Connection failed:", error);
      throw error;
    }
  }

  public async disconnect() {
    this.clearAutoReconnectTimer();
    await deviceService.disconnect();
  }
}

export const connectionManager = new ConnectionManager();
