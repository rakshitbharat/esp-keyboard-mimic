import Store from "electron-store";
import { AppConfig } from "../types/global";

const defaultConfig: Readonly<AppConfig> = {
  deviceName: "ESP Keyboard Mimic",
  typingSpeed: 100,
  typingDelay: 50,
  useRandomDelay: true,
  randomDelayRange: [30, 100],
  keyboardLayout: "us",
  autoConnect: false,
  theme: "system",
};

class ConfigService {
  private store: Store<AppConfig>;

  constructor() {
    this.store = new Store<AppConfig>({
      defaults: defaultConfig,
    });
  }

  public getConfig(): AppConfig {
    return this.store.store;
  }

  public updateConfig(partialConfig: Partial<AppConfig>): void {
    this.store.set(partialConfig as any);
  }

  public getTypingDelay(): number {
    return this.store.get("typingDelay");
  }

  public getRandomDelayRange(): [number, number] {
    return this.store.get("randomDelayRange");
  }

  public getKeyboardLayout(): string {
    return this.store.get("keyboardLayout");
  }

  public setKeyboardLayout(layout: string): void {
    this.store.set("keyboardLayout", layout);
  }

  public getAutoConnect(): boolean {
    return this.store.get("autoConnect");
  }

  public setAutoConnect(value: boolean): void {
    this.store.set("autoConnect", value);
  }
}

export const configService = new ConfigService();
