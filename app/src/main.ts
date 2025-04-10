import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV === 'development'
    }
  });

  // Prevent DevTools from opening automatically
  mainWindow.webContents.on('devtools-opened', () => {
    if (process.env.NODE_ENV !== 'development') {
      mainWindow.webContents.closeDevTools();
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
