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
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    type: {
      type: Number,
    },
    status: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
  },
});
