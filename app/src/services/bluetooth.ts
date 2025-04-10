import noble from "@abandonware/noble";

interface Peripheral {
  advertisement: {
    localName?: string;
  };
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export class BluetoothService {
  private noble: typeof noble;
  private connectedDevice?: Peripheral;

  constructor() {
    this.noble = noble;
    this.setupNobleHandlers();
  }

  private setupNobleHandlers() {
    this.noble.on("stateChange", (state: string) => {
      if (state === "poweredOn") {
        this.startScanning();
      }
    });

    this.noble.on("discover", async (peripheral: Peripheral) => {
      if (peripheral.advertisement.localName?.includes("ESP-Keyboard")) {
        await this.connectToPeripheral(peripheral);
      }
    });
  }

  private startScanning() {
    this.noble.startScanning([], true);
  }

  async connect() {
    // Connection logic
  }

  async disconnect() {
    if (this.connectedDevice) {
      await this.connectedDevice.disconnect();
      this.connectedDevice = undefined;
    }
  }

  private async connectToPeripheral(peripheral: Peripheral) {
    try {
      await peripheral.connect();
      this.connectedDevice = peripheral;
    } catch (error) {
      console.error("Failed to connect:", error);
      throw error;
    }
  }
}
