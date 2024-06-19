import { Quadrant } from "../../../ipc/todoCurd";
import { TodoServices } from "../services/Todo";
export class TodoController {
  static async addOrUpdate({
    id,
    title,
    priority,
    description,
  }: {
    id?: number;
    title: string;
    description: string;
    priority: Quadrant;
  }) {
    const res = id
      ? await TodoServices.updateUser({ id, title, description, priority })
      : TodoServices.addUser({ description, title, priority });
    return res;
  }
}
