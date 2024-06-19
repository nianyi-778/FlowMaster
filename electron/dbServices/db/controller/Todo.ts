import { TodoServices } from "../services/Todo";
export class TodoController {
  static async addOrUpdate({
    id,
    title,
    description,
  }: {
    id?: number;
    title: string;
    description: string;
  }) {
    const res = id
      ? await TodoServices.updateUser({ id, title, description })
      : TodoServices.addUser({ description, title });
    return res;
  }
}
