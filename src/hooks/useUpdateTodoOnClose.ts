import { useEffect } from "react";
import { getCurrent, Window } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { TauriEvent, UnlistenFn } from "@tauri-apps/api/event";
import { Todo } from "@/types/todo";

const useUpdateTodoOnClose = ({
  id,
  title,
  describe,
}: {
  id?: string;
  title?: string;
  describe?: string;
}) => {
  useEffect(() => {
    let unOnce: UnlistenFn;
    let win: Window | null = null;
    const handleWindowCloseRequested = async () => {
      console.log("WINDOW_CLOSE_REQUESTED");
      if (id) {
        try {
          const current = await invoke<Todo>("get_todo", { id });
          const { updated_at, ...rest } = current;
          const updateTodo = { ...rest, updated_at: Date.now(), id: +id, title, describe };
          const result = await invoke<Todo>("update_todo", { todo: updateTodo });
          console.log(result, "update");
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      }
      win?.close();
    };

    (async () => {
      win = await getCurrent();
      unOnce = await win.once(TauriEvent.WINDOW_CLOSE_REQUESTED, handleWindowCloseRequested);
    })();

    return () => {
      unOnce?.();
    };
  }, [id, title, describe]);
};

export default useUpdateTodoOnClose;
