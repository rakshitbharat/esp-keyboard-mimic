import { globalShortcut, BrowserWindow } from "electron";

export function registerGlobalShortcuts(mainWindow: BrowserWindow) {
  // Toggle window visibility
  globalShortcut.register("CommandOrControl+Shift+Space", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Toggle typing mode
  globalShortcut.register("CommandOrControl+Shift+T", () => {
    mainWindow.webContents.send("toggle-typing");
  });

  // Quick connect/disconnect
  globalShortcut.register("CommandOrControl+Shift+C", () => {
    mainWindow.webContents.send("toggle-connection");
  });
}

export function unregisterShortcuts() {
  globalShortcut.unregisterAll();
}
