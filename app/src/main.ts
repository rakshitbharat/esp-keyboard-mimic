import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Add IPC handlers
  ipcMain.handle("connect-device", async () => {
    // TODO: Implement device connection
    return true;
  });

  ipcMain.handle("send-text", async (_, text: string) => {
    // TODO: Implement text sending
    return true;
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "index.html")); // Changed from "../index.html"
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
