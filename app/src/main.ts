import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Set up IPC handlers
  setupIpcHandlers();
}

function setupIpcHandlers() {
  ipcMain.handle("connect-device", async () => {
    // TODO: Implement actual device connection
    console.log("Attempting to connect to device...");
    return true;
  });

  ipcMain.handle("send-text", async (_, text: string) => {
    // TODO: Implement actual text sending
    console.log("Sending text:", text);

    // Simulate typing progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      mainWindow?.webContents.send("typing-status", {
        typing: true,
        progress,
      });

      if (progress >= 100) {
        clearInterval(interval);
        mainWindow?.webContents.send("typing-status", {
          typing: false,
          progress: 0,
        });
      }
    }, 500);

    return true;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
