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
    const tick = id ? userServices.updateUser : userServices.addUser;
    const res = await tick({ id, userName, nickName });
    return res;
  }
}
