import { useEffect } from "react";
import { getCurrent, Window } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { TauriEvent, UnlistenFn } from "@tauri-apps/api/event";
import { Quadrant, Todo } from "@/types/todo";

const useUpdateTodoOnClose = ({
  id,
  title,
  describe,
  level,
}: {
  id?: string;
  title?: string;
  describe?: string;
  level?: Quadrant;
}) => {
  useEffect(() => {
    let unOnce: UnlistenFn;
    let win: Window | null = null;
    const handleWindowCloseRequested = async () => {
      console.log("WINDOW_CLOSE_REQUESTED");
      if (id) {
        try {
          const current = await invoke<Todo>("get_todo", { id });
          const { updated_at, quadrant, ...rest } = current;
          const updateTodo = {
            ...rest,
            quadrant: level,
            updated_at: Date.now(),
            id: +id,
            title,
            describe,
          };
          const result = await invoke<Todo>("update_todo", { todo: updateTodo });
          console.log(result, "update");
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      } else {
        // add
        console.log("add", title, describe, level);
        try {
          const result = await invoke<Todo>("new_todo", {
            todo: { title, describe, quadrant: level },
          });
          console.log(result, "new_todo");
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
  }, [id, title, describe, level]);
};

export default useUpdateTodoOnClose;
