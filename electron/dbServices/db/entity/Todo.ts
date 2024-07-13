import { EntitySchema } from "typeorm";

export const Todo = new EntitySchema({
  name: "Todo",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    parentId: {
      type: Number,
      nullable: true,
    },
    title: {
      type: String,
      nullable: true,
    },
    columnName: {
      type: String,
      default: "未分组",
    },
    columnOrder: {
      type: Number,
      nullable: true,
    },
    order: {
      type: Number,
      nullable: true,
    },
    tag: {
      type: String,
      nullable: true,
    },
    description: {
      type: String,
      nullable: true,
    },
    completedTime: {
      // 结束时间
      type: Number,
      nullable: true,
    },
    updateTime: {
      type: Number,
      nullable: true,
    },
    // type: {
    //   type: Number,
    //   enum: [1, 2, 3, 4],
    // },
    status: {
      type: Number,
      default: 0,
      enum: [0, 1, 2], // 0 Normal  1 Completed  2 Archived
    },
    isDeleted: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
  },
});
