import { TodoServices } from "../services/Todo";
export class TodoController {
  static async addOrUpdate({
    id,
    userName,
    nickName,
  }: {
    id?: number;
    userName: string;
    nickName: string;
  }) {
    const res = id
      ? await TodoServices.updateUser({ id, userName, nickName })
      : TodoServices.addUser({ userName, nickName });
    return res;
  }
}
