import { BrowserWindow, IpcMainInvokeEvent } from "electron";
import { TodoController } from "../dbServices/db/controller/Todo";

export enum Quadrant {
  First = 1,
  Second,
  Third,
  NumberFour,
}

export interface TodoItem {
  title: string;
  description: string;
  priority: Quadrant;
  id?: number;
  status?: 1 | 0;
}

export type TypeEnum = "findAll" | "findById" | "create" | "update" | "delete";

type Todo = TodoItem;
export const TodoCurdName = "TodoCurd";
export const TodoGetName = "TodoGet";

export async function TodoAddOrUpdate(_event: IpcMainInvokeEvent, todo: Todo) {
  const { title, description, priority, id, status } = todo;
  const result = await TodoController.addOrUpdate({
    title,
    description,
    id,
    priority,
    status,
  });
  const top = BrowserWindow.getFocusedWindow();
  if (top) {
    await top.webContents.send("win-close-after");
  }
  return result;
}

export function TodoGet(_event: IpcMainInvokeEvent, id?: number) {
  if (id) {
    return TodoController.getTodo(id);
  }
  return TodoController.getTodoList();
}
