import { ipcMain } from 'electron';
import { DeviceManager } from './deviceManager';

export function setupIpcHandlers(deviceManager: DeviceManager) {
  ipcMain.handle('connect-device', async () => {
    return await deviceManager.connect();
  });

  ipcMain.handle('disconnect-device', async () => {
    return await deviceManager.disconnect();
  });

  ipcMain.handle('send-text', async (_, text: string) => {
    return await deviceManager.sendText(text);
  });

  ipcMain.handle('update-settings', async (_, settings: DeviceSettings) => {
    return await deviceManager.updateSettings(settings);
  });

  // Setup event emitters for status updates
  deviceManager.on('connection-status', (status: boolean) => {
    // Send to all windows
  });

  deviceManager.on('typing-status', (status: { typing: boolean; progress?: number }) => {
    // Send to all windows
  });
}
