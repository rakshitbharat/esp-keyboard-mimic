import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import Store from "electron-store";
import { AppConfig } from "./types/config";
import { BluetoothService } from "./services/bluetooth";

// Initialize electron store with proper typing
const store = new Store<AppConfig>({
  defaults: {
    typingDelay: 50,
    useRandomDelay: true,
    randomDelayRange: [30, 100],
    keyboardLayout: "US",
    autoConnect: false,
  },
});

// Initialize Bluetooth service
let bluetoothService: BluetoothService;
let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Enable window dragging
  mainWindow.setHasShadow(true);

  // Load the last position or default to center
  const windowBounds = store.get("windowBounds");
  if (windowBounds) {
    mainWindow.setBounds(windowBounds);
  }

  // Save window position when moved
  mainWindow.on("moved", () => {
    store.set("windowBounds", mainWindow.getBounds());
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Show DevTools in development
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  return mainWindow;
}

// Handle IPC messages
ipcMain.handle("connect-device", async () => {
  try {
    await bluetoothService.connect();
    mainWindow.webContents.send("connection-status", true);
    return true;
  } catch (error) {
    console.error("Failed to connect:", error);
    mainWindow.webContents.send("connection-status", false);
    throw error;
  }
});

ipcMain.handle("send-text", async (_, text: string) => {
  try {
    if (!bluetoothService.isConnected()) {
      throw new Error("Device not connected");
    }

    // Start typing progress
    mainWindow.webContents.send("typing-status", { typing: true, progress: 0 });

    // Send text in chunks and update progress
    const chunks = text.match(/.{1,20}|.+/g) || [];
    for (let i = 0; i < chunks.length; i++) {
      await bluetoothService.sendText(chunks[i]);
      const progress = ((i + 1) / chunks.length) * 100;
      mainWindow.webContents.send("typing-status", { typing: true, progress });
    }

    // Complete typing
    mainWindow.webContents.send("typing-status", {
      typing: false,
      progress: 100,
    });
    return true;
  } catch (error) {
    console.error("Failed to send text:", error);
    mainWindow.webContents.send("typing-status", { typing: false });
    throw error;
  }
});

app.whenReady().then(() => {
  // Initialize Bluetooth service
  bluetoothService = new BluetoothService();

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Register global shortcuts
  const { globalShortcut } = require("electron");

  // Register Ctrl/Cmd + Alt + Space to show/hide window
  globalShortcut.register("CommandOrControl+Alt+Space", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
});

app.on("will-quit", () => {
  // Clean up Bluetooth connection
  if (bluetoothService) {
    bluetoothService.disconnect();
  }

  // Unregister all shortcuts
  const { globalShortcut } = require("electron");
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
