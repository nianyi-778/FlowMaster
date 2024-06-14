import { userServices } from "../services/user";
export class userController {
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
      ? await userServices.updateUser({ id, userName, nickName })
      : userServices.addUser({ userName, nickName });
    return res;
  }
}
