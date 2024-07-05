import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  IpcMainInvokeEvent,
  screen,
} from "electron";
import { webPreferences } from "../main";

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
    transparent: false,
    frame: false,
    resizable: false,
    webPreferences,
    ...options,
  });
  // 加载页面
  child.loadURL("http://localhost:5173" + url);

  // 获取当前窗口所在显示器的信息
  const currentDisplay = screen.getDisplayMatching(child.getBounds());
  // const screenWidth = currentDisplay.bounds.width;
  // const { width: defaultWidth = 0, x = 0, y = 0 } = options;

  // const space = 20;
  // let newX = x + space;
  // const newY = y - space;

  // if (newX + defaultWidth > screenWidth) {
  //   newX = x - space - defaultWidth;
  // }
  child.once("ready-to-show", async () => {
    // await child.setPosition(newX, newY, true);
    child.show();
  });

  console.log("当前焦点显示器的信息:");
  console.log(`- 屏幕宽度: ${currentDisplay.bounds.width}px`);
  console.log(`- 屏幕高度: ${currentDisplay.bounds.height}px`);

  top &&
    top.once("focus", () => {
      child.close();
    });

  return true;
}

export const WinClosedName = "WinClosed";
// 失焦
export function WinClosed(_event: IpcMainInvokeEvent, callback: () => void) {
  // 获取焦点窗口
  const top = BrowserWindow.getFocusedWindow();
  top &&
    top.once("closed", () => {
      callback?.();
    });
}
