import { ipcMain } from "electron";
import { CreateWin, CreateWinName } from "./createWin";

// ipc 注入
export function ipcInject() {
  ipcMain.on(CreateWinName, CreateWin);
}
