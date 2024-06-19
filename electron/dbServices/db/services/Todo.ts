import { Quadrant } from "../../../ipc/todoCurd";
import { todoDao } from "../dao/Todo";

export class TodoServices {
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
    // console.log(userDao.getInstance().update);
    console.log(id, title, description);
    // const res = await userDao.getInstance().insertUser(user);
    // return res;
    return todoDao.getInstance();
  }
}
