import { ipcMain } from "electron";
import { CreateWin, CreateWinName, WinClosed, WinClosedName } from "./createWin";
import { TodoCurd, TodoCurdName } from "./todoCurd";

// ipc 注入
export function ipcInject() {
  ipcMain.on(CreateWinName, CreateWin);
  ipcMain.on(TodoCurdName, TodoCurd);
  ipcMain.on(WinClosedName, WinClosed);
}
