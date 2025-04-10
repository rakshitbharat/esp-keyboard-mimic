import Store from 'electron-store';

interface AppConfig {
  typingDelay: number;
  useRandomDelay: boolean;
  randomDelayRange: [number, number];
  autoConnect: boolean;
  lastConnectedDevice?: string;
}

class ConfigService {
  private store: Store<AppConfig>;

  constructor() {
    this.store = new Store<AppConfig>({
      defaults: {
        typingDelay: 50,
        useRandomDelay: true,
        randomDelayRange: [30, 100],
        autoConnect: true,
      }
    });
  }

  get config(): AppConfig {
    return this.store.store;
  }

  updateConfig(partialConfig: Partial<AppConfig>) {
    this.store.set(partialConfig);
  }

  get typingDelay(): number {
    return this.store.get('typingDelay');
  }

  get useRandomDelay(): boolean {
    return this.store.get('useRandomDelay');
  }

  get randomDelayRange(): [number, number] {
    return this.store.get('randomDelayRange');
  }
}

export default new ConfigService();
