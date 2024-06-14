import { dataSource } from "../dbInit";
import { User } from "../entity/user";
export class userDao {
  static instance: unknown;
  repository;
  constructor() {
    console.log("isSer", dataSource.isInitialized);
    this.repository = dataSource.getRepository(User);
  }
  // 获取实例
  static getInstance() {
    if (!this.instance) {
      this.instance = new userDao();
    }
    return this.instance;
  }
  getTransactionInstance(manager: any) {
    const instance = new userDao();
    instance.repository = manager().getRepository(User);
    return instance;
  }
  async insertUser({ userName, nickName }: { userName: string; nickName: string }) {
    console.log(userName, nickName);
    // return dataSource.createQueryBuilder()
    // .insert()
    // .into(User)
    // .values({ userName:'ss', nickName:'nnn' })
    // .execute()
    return await this.repository.insert({ userName, nickName });
  }
  async updateUser({
    id,
    userName,
    nickName,
  }: {
    id?: number;
    userName: string;
    nickName: string;
  }) {
    return await this.repository.update({ id }, { userName, nickName });
  }
}
