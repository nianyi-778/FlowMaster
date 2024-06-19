import { IpcMainInvokeEvent } from "electron";

export enum Quadrant {
  First = 1,
  Second,
  Third,
  NumberFour,
}

export interface TodoAdd {
  titles: string;
  description: string;
  priority: Quadrant;
}

type Todo = TodoAdd;
export const TodoCurdName = "TodoCurd";

export function TodoCurd(_event: IpcMainInvokeEvent, todo: Todo) {
  console.log(todo);
}
