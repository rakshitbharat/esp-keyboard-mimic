import { ipcMain } from 'electron';
import configService from './config';

class TextService {
  private isTyping: boolean = false;
  private currentText: string = '';
  private currentPosition: number = 0;

  constructor() {
    this.setupIpcHandlers();
  }

  private setupIpcHandlers() {
    ipcMain.handle('start-typing', async (_, text: string) => {
      if (this.isTyping) {
        return { success: false, message: 'Already typing' };
      }

      this.currentText = text;
      this.currentPosition = 0;
      this.isTyping = true;
      
      return this.typeText();
    });

    ipcMain.handle('stop-typing', () => {
      this.isTyping = false;
      this.currentText = '';
      this.currentPosition = 0;
      return { success: true };
    });
  }

  private async typeText(): Promise<{ success: boolean; message?: string }> {
    while (this.isTyping && this.currentPosition < this.currentText.length) {
      const char = this.currentText[this.currentPosition];
      
      // Calculate delay based on settings
      const baseDelay = configService.typingDelay;
      const delay = configService.useRandomDelay
        ? baseDelay + Math.random() * (configService.randomDelayRange[1] - configService.randomDelayRange[0])
        : baseDelay;

      await new Promise(resolve => setTimeout(resolve, delay));
      
      // TODO: Send character to ESP32 via Bluetooth
      this.currentPosition++;
    }

    this.isTyping = false;
    return { success: true };
  }
}

export default TextService;
