import { Todo } from "@/types/todo";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  list: Todo[];
  current?: null | Todo;
};
type Actions = {
  setTodoList: (data: Todo[]) => void;
  updateTodo: (data: Todo) => void;
  setCurrent: (id: string) => void;
};

export const useTodoStore = create<State & Actions>()(
  immer((set) => ({
    list: [],
    current: null,
    setCurrent: (id: string) =>
      set((state) => {
        state.current = state.list.find((s) => s.id === id);
      }),
    setTodoList: (data: Todo[]) => set(() => ({ list: data })),
    updateTodo: (data: Todo) =>
      set((state) => {
        const i = state.list.findIndex((s) => s.id === data.id);
        if (i) {
          state.list[i] = data;
        }
      }),
  }))
);
