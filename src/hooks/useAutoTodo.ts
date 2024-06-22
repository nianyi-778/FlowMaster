// 自动同步本地数据库到内存

import { useTodoStore } from "@/store";
import { Todo } from "@/types/todo";
import { useCallback, useEffect } from "react";

export default function useAutoTodo() {
  const setTodos = useTodoStore((state: { setTodoList: (x: Todo[]) => void }) => state.setTodoList);

  const asyncTodoData = useCallback(async () => {
    const result = await window.ipcRenderer.invoke("TodoGet");
    setTodos(result);
  }, [setTodos]);

  useEffect(() => {
    asyncTodoData();
  }, [asyncTodoData]);

  return {
    asyncTodoData,
  };
}
