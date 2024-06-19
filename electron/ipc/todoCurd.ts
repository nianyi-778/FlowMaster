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

type Todo = TodoItem;
export const TodoCurdName = "TodoCurd";

export function TodoCurd(_event: IpcMainInvokeEvent, todo: Todo) {
  console.log(todo);
  const { title, description, priority, id } = todo;
  TodoController.addOrUpdate({
    title,
    description,
    id,
    priority,
  });
}
