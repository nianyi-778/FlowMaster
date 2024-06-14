import { userDao } from "../dao/user";

export class userServices {
  static async addUser(user: { userName: string; nickName: string }) {
    console.log(user);
    // const res = await userDao.getInstance().insertUser(user);
    return {};
  }
  static async updateUser({
    id,
    userName,
    nickName,
  }: {
    id: number;
    userName: string;
    nickName: string;
  }) {
    // console.log(userDao.getInstance().update);
    console.log(id, userName, nickName);
    // const res = await userDao.getInstance().insertUser(user);
    // return res;
    return userDao.getInstance();
  }
}
