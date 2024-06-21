import { Quadrant } from "../../../ipc/todoCurd";
import { todoDao } from "../dao/Todo";

export class TodoServices {
  static async getTodoList() {
    const result = await todoDao.getInstance().getTodoList();
    return result;
  }

  static getTodo(id: number) {
    return todoDao.getInstance().getTodoById(id);
  }

  static async addUser(todo: { description: string; title: string; priority?: Quadrant }) {
    const res = await todoDao.getInstance().insertTodo(todo);
    return res;
  }
  static async updateUser({
    id,
    description,
    title,
    priority,
  }: {
    id: number;
    description: string;
    title: string;
    priority?: Quadrant;
  }) {
    return todoDao.getInstance().updateTodo({
      id,
      title,
      description,
      priority,
    });
  }
}
