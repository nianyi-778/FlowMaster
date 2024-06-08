import { BrowserWindow, BrowserWindowConstructorOptions, IpcMainInvokeEvent } from "electron";

export interface CreateWin {
  options: BrowserWindowConstructorOptions;
  url: string;
}

export const CreateWinName = "CreateWin";

export function CreateWin(_event: IpcMainInvokeEvent, { options, url }: CreateWin) {
  // 获取焦点窗口
  const top = BrowserWindow.getFocusedWindow();
  // 创建窗口
  const child = new BrowserWindow({
    parent: top ? top : undefined,
    show: false,
    movable: false,
    resizable: false,
    titleBarStyle: "hidden",
    ...options,
  });
  // 加载页面
  child.loadURL("http://localhost:5173" + url);
  //   child.loadURL("https://github.com");
  child.once("ready-to-show", () => {
    child.show();
  });
  top &&
    top.once("focus", () => {
      child.close();
    });
}
