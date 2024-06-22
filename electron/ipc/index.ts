import { ipcMain } from "electron";
import { CreateWin, CreateWinName, WinClosed, WinClosedName } from "./createWin";
import { TodoAddOrUpdate, TodoCurdName, TodoGetName, TodoGet } from "./todoCurd";

// ipc 注入
export function ipcInject() {
  ipcMain.handle(CreateWinName, CreateWin);
  ipcMain.on(TodoCurdName, TodoAddOrUpdate);
  ipcMain.handle(TodoGetName, TodoGet);
  ipcMain.on(WinClosedName, WinClosed);
}
