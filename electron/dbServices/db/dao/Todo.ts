// import { EntityManager } from "typeorm";
import { Quadrant } from "../../../ipc/todoCurd";
import { dataSource } from "../dbInit";
import { Todo } from "../entity/Todo";
export class todoDao {
  static instance: todoDao;
  repository;
  constructor() {
    console.log("isSer", dataSource.isInitialized);
    this.repository = dataSource.getRepository(Todo);
  }
  // 获取实例
  static getInstance() {
    if (!this.instance) {
      this.instance = new todoDao();
    }
    return this.instance;
  }
  // getTransactionInstance(manager: () => EntityManager) {
  //   const instance = new todoDao();
  //   instance.repository = manager().getRepository(Todo);
  //   return instance;
  // }
  async insertTodo({
    description,
    title,
    priority,
  }: {
    description: string;
    title: string;
    priority?: Quadrant;
  }) {
    return await this.repository.insert({ description, title, priority });
  }
  async updateTodo({
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
