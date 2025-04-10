export interface AppConfig {
  typingDelay: number;
  useRandomDelay: boolean;
  randomDelayRange: [number, number];
  windowBounds?: Electron.Rectangle;
  keyboardLayout: string;
  deviceName?: string;
  autoConnect: boolean;
}

declare module "electron-store" {
  type Schema = Record<string, unknown>;

  class ElectronStore<T extends Schema = Schema> {
    constructor(options?: ElectronStore.Options<T>);
    public store: T;
    public get<K extends keyof T>(key: K): T[K];
    public set<K extends keyof T>(key: K, value: T[K]): void;
    public set(object: Partial<T>): void;
    public has(key: keyof T): boolean;
    public reset(...keys: Array<keyof T>): void;
    public delete(key: keyof T): void;
    public clear(): void;
  }

  namespace ElectronStore {
    interface Options<T extends Schema = Schema> {
      name?: string;
      cwd?: string;
      encryptionKey?: string | Buffer;
      fileExtension?: string;
      clearInvalidConfig?: boolean;
      serialize?: (value: T) => string;
      deserialize?: (value: string) => T;
      defaults?: Partial<T>;
    }
  }

  export = ElectronStore;
}
