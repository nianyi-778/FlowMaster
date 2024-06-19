import { EntitySchema } from "typeorm";

export const Todo = new EntitySchema({
  name: "Todo",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
      nullable: true,
    },
    description: {
      type: String,
      nullable: true,
    },
    deadline: {
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
      enum: [0, 1],
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
