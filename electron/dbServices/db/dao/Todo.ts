import { Quadrant } from "../../../ipc/todoCurd";
import { dataSource } from "../dbInit";
import { Todo } from "../entity/Todo";
import { ObjectLiteral } from "typeorm";
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
    return await this.repository.insert({ description, title, priority, updateTime: Date.now() });
  }
  async updateTodo({
    id,
    description,
    title,
    priority,
    status,
  }: {
    id: number;
    description: string;
    title: string;
    priority?: Quadrant;
    status?: 0 | 1;
  }) {
    const item = await this.getTodoById(id);
    if (item) {
      return await this.repository.update(
        { id },
        {
          description: description || item.description,
          title: title || item.title,
          priority: priority || item.priority,
          updateTime: Date.now(),
          status: status || item.status,
        }
      );
    }
    return null;
  }

  async getTodoList() {
    // 查列表
    const listResult = await this.repository.find({
      where: {
        isDeleted: 0,
      },
    });

    return listResult;
  }

  getTodoById(id: number): Promise<ObjectLiteral | null> {
    return this.repository.findOne({
      where: {
        isDeleted: 0,
        id,
      },
    });
  }
}
