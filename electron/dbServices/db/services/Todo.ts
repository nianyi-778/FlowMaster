import { userDao } from "../dao/Todo";

export class TodoServices {
  static async addUser(user: { description: string; title: string }) {
    console.log(user);
    // const res = await userDao.getInstance().insertUser(user);
    return {};
  }
  static async updateUser({
    id,
    description,
    title,
  }: {
    id: number;
    description: string;
    title: string;
  }) {
    // console.log(userDao.getInstance().update);
    console.log(id, title, description);
    // const res = await userDao.getInstance().insertUser(user);
    // return res;
    return userDao.getInstance();
  }
}
