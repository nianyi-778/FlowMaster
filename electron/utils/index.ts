import path from "node:path";
import { app, BrowserWindow } from "electron";
// 获取app目录
export const getAppHand = () => {
  return app.getPath("appData");
};

// 加载页面
export const loadPage = (win: BrowserWindow, url: string) => {
  const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
  const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL + "#" + url);
  } else {
    const url = path.join(RENDERER_DIST, "index.html");
    win.loadFile(url + "#" + url);
  }
};
