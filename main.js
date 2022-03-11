const { app, BrowserWindow } = require("electron");

// Set env
process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    title: "ImageShrink",
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
  });
  mainWindow.loadFile(`${__dirname}/app/index.html`);
}

app.on("ready", createMainWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
  // On macOS it's common to apps and their menu bar to stay
  // active until the user quits explicitly with Cmd + Q
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
