import { ipcMain } from "electron";
import noble from "@abandonware/noble";

class BluetoothService {
  private isScanning: boolean = false;
  private connectedDevice: any = null;

  constructor() {
    this.initializeNoble();
    this.setupIpcHandlers();
  }

  private initializeNoble() {
    noble.on("stateChange", (state) => {
      console.log("Bluetooth adapter state:", state);
      if (state === "poweredOn" && !this.isScanning) {
        this.startScanning();
      }
    });

    noble.on("discover", (peripheral) => {
      if (peripheral.advertisement.localName?.includes("ESP-Keyboard")) {
        console.log("Found ESP device:", peripheral.advertisement.localName);
        this.connectToDevice(peripheral);
      }
    });
  }

  private startScanning() {
    this.isScanning = true;
    noble.startScanning([], true);
  }

  private async connectToDevice(peripheral: any) {
    try {
      await peripheral.connectAsync();
      this.connectedDevice = peripheral;
      console.log("Connected to:", peripheral.advertisement.localName);

      // Discover services and characteristics
      const { characteristics } =
        await peripheral.discoverSomeServicesAndCharacteristicsAsync(
          ["1812"], // HID Service UUID
          ["2A4D"] // HID Report Characteristic UUID
        );

      // Store characteristics for sending data
      this.connectedDevice.characteristics = characteristics;
    } catch (error) {
      console.error("Connection error:", error);
    }
  }

  private setupIpcHandlers() {
    ipcMain.handle("connect-device", async () => {
      if (!this.connectedDevice) {
        this.startScanning();
        return { success: false, message: "Scanning for devices..." };
      }
      return { success: true, message: "Already connected" };
    });

    ipcMain.handle("send-text", async (_, text: string) => {
      if (!this.connectedDevice?.characteristics) {
        return { success: false, message: "No device connected" };
      }

      try {
        // Send text to ESP32 device
        await this.connectedDevice.characteristics[0].writeAsync(
          Buffer.from(text),
          true
        );
        return { success: true };
      } catch (error) {
        console.error("Send text error:", error);
        return { success: false, message: "Failed to send text" };
      }
    });
  }
}

export default BluetoothService;
