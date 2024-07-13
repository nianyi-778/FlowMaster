import path from "node:path";
import { app, BrowserWindow } from "electron";
import { VITE_DEV_SERVER_URL, RENDERER_DIST } from "../main";
// 获取app目录
export const getAppHand = () => {
  return app.getPath("appData");
};

// 加载页面
export const loadPage = (win: BrowserWindow, url: string) => {
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL + "#" + url);
  } else {
    const base = path.join(RENDERER_DIST, "index.html");
    win.loadFile(base, {
      hash: url,
    });
  }
};
