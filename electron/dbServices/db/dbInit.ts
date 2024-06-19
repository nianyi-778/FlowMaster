import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_CONFIG, APP_NAME } from "../../utils/constants";
import { getAppHand } from "../../utils";
import { Todo } from "./entity/Todo";
import path from "node:path";
export let dataSource: DataSource;
export const dbConnectionHand = async () => {
  const dataBase = path.join(getAppHand(), APP_NAME, DB_CONFIG.dbFileName);

  dataSource = new DataSource({
    // 完整文件路径
    database: dataBase,
    logger: "simple-console",
    type: "better-sqlite3", // 设定链接的数据库类型
    synchronize: true, // 确保每次运行应用程序时实体都将与数据库同步
    logging: ["error", "warn"], // 日志，默认在控制台中打印，数组列举错误类型枚举
    entities: [Todo],
    // entities: [path.join(__dirname, "./entity/*.ts")],
  });
  dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err: unknown) => {
      console.error("Error during Data Source initialization", err);
    });
};
