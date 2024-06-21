import { IpcMainInvokeEvent } from "electron";
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
}

export type TypeEnum = "findAll" | "findById" | "create" | "update" | "delete";

type Todo = TodoItem;
export const TodoCurdName = "TodoCurd";
export const TodoGetName = "TodoGet";

export async function TodoAddOrUpdate(_event: IpcMainInvokeEvent, todo: Todo) {
  console.log(todo);
  const { title, description, priority, id } = todo;
  return await TodoController.addOrUpdate({
    title,
    description,
    id,
    priority,
  });
}

export function TodoGet(_event: IpcMainInvokeEvent, { id }: { id?: number }) {
  if (id) {
    return TodoController.getTodo(id);
  }
  return TodoController.getTodoList();
}
