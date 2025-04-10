import { BLE } from "@abandonware/noble";

export class BluetoothService {
  private noble: BLE;
  private peripheral: any;
  private writeCharacteristic: any;
  private connected: boolean = false;

  constructor() {
    this.noble = require("@abandonware/noble");
    this.setupNobleHandlers();
  }

  private setupNobleHandlers() {
    this.noble.on("stateChange", (state) => {
      if (state === "poweredOn") {
        this.startScanning();
      }
    });

    this.noble.on("discover", async (peripheral) => {
      // Look for ESP32 device with our service
      if (peripheral.advertisement.localName?.includes("ESP-Keyboard")) {
        await this.connectToPeripheral(peripheral);
      }
    });
  }

  private startScanning() {
    this.noble.startScanning([], true);
  }

  private async connectToPeripheral(peripheral: any) {
    try {
      await peripheral.connectAsync();
      const { characteristics } =
        await peripheral.discoverAllServicesAndCharacteristicsAsync();

      this.writeCharacteristic = characteristics.find((c: any) =>
        c.properties.includes("write")
      );

      if (!this.writeCharacteristic) {
        throw new Error("Write characteristic not found");
      }

      this.peripheral = peripheral;
      this.connected = true;

      // Stop scanning once connected
      this.noble.stopScanning();
    } catch (error) {
      console.error("Failed to connect to peripheral:", error);
      throw error;
    }
  }

  public async connect(): Promise<void> {
    if (this.noble.state === "poweredOn") {
      this.startScanning();
    }
    // If not powered on, the stateChange handler will start scanning
  }

  public async disconnect(): Promise<void> {
    if (this.peripheral) {
      await this.peripheral.disconnectAsync();
      this.connected = false;
      this.peripheral = null;
      this.writeCharacteristic = null;
    }
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public async sendText(text: string): Promise<void> {
    if (!this.connected || !this.writeCharacteristic) {
      throw new Error("Not connected to device");
    }

    try {
      await this.writeCharacteristic.writeAsync(Buffer.from(text), false);
    } catch (error) {
      console.error("Failed to send text:", error);
      throw error;
    }
  }
}
