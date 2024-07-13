import { app, BrowserWindow, Menu, nativeImage, Tray } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { mainInitHand } from "./dbServices/dbServicesInit";
import path from "node:path";
import { ipcInject } from "./ipc";
import log from "electron-log";

// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

export const webPreferences = {
  nodeIntegration: true,
  contextIsolation: true, // 禁用安全策略
  webSecurity: false, // 禁用同源策略
  preload: path.join(MAIN_DIST, "preload.mjs"),
};

const dockMenu = Menu.buildFromTemplate([
  {
    label: "高级 test",
    click() {
      console.log("New Window");
    },
  },
]);

const isMac = process.platform === "darwin";

if (!VITE_DEV_SERVER_URL) {
  // 判断如果是dev环境就将log存储在项目根目录的logs文件夹
  log.transports.file.resolvePath = () =>
    path.join(__dirname, `logs/${new Date().toLocaleDateString()}.log`);
}
// 设置log日志的格式可以去electron-log官方文档查看更多格式化
log.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "MasterFlow",
    minWidth: 630,
    minHeight: 462,
    show: false,
    titleBarStyle: "hidden",
    transparent: isMac,
    frame: false,
    resizable: true,
    titleBarOverlay: {
      color: "#f8faff",
    },
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: webPreferences,
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.show();
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    const url = path.join(RENDERER_DIST, "index.html");
    win.loadFile(url);
  }
  if (win) {
    // 减少显示空白窗口的时间
    win.once("ready-to-show", () => {
      if (win) {
        win.show();
        win?.webContents.send("main-process-message", new Date().toLocaleString());
      }
    });
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
let tray = null;
app
  .whenReady()
  .then(() => {
    const icon = nativeImage.createFromPath(path.join(RENDERER_DIST, "/logo.png"));
    tray = new Tray(icon);
    console.log(tray, "tray");
    tray.on("click", () => {
      // 处理单击事件
      console.log("单机");
    });

    tray.on("right-click", () => {
      // 处理右键单击事件
      console.log("邮件");
    });

    const contextMenu = Menu.buildFromTemplate([
      { label: "Item1", type: "radio" },
      { label: "Item2", type: "radio" },
      { label: "Item3", type: "radio", checked: true },
      { label: "Item4", type: "radio" },
    ]);

    tray.setContextMenu(contextMenu);

    tray.setToolTip("This is my application");
    tray.setTitle("This is my title");

    if (isMac) {
      app.dock.setMenu(dockMenu);
    }
  })
  .then(() => {
    ipcInject();
    mainInitHand();
  })
  .then(() => {
    createWindow();
  });
