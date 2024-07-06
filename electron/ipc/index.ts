import { ipcMain } from "electron";
import { CreateWin, CreateWinName, WinClosed, WinClosedName } from "./createWin";
import { TodoAddOrUpdate, TodoCurdName, TodoGetName, TodoGet } from "./todoCurd";
import { OpenExternal, OpenExternalName } from "./openExternal";

// ipc 注入
export function ipcInject() {
  ipcMain.handle(CreateWinName, CreateWin);
  ipcMain.on(TodoCurdName, TodoAddOrUpdate);
  ipcMain.handle(TodoGetName, TodoGet);
  ipcMain.on(WinClosedName, WinClosed);
  ipcMain.on(OpenExternalName, OpenExternal);
}
