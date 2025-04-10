import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import Store from "electron-store";
import BluetoothService from "./services/bluetooth";

// Initialize electron store
const store = new Store();

// Initialize Bluetooth service
let bluetoothService: BluetoothService;

function createWindow() {
  const mainWindow = new BrowserWindow({
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

  // Enable reload in development mode
  if (process.env.NODE_ENV === "development") {
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
      hardResetMethod: "exit",
    });
  }

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Show DevTools in development
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  // Initialize Bluetooth service after window creation
  bluetoothService = new BluetoothService();

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
  // Unregister all shortcuts
  const { globalShortcut } = require("electron");
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
