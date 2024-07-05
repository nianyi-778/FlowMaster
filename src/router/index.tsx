import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import AddTodo from "@/pages/AddTodo";
import TodoItemMenu from "@/pages/TodoItemMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />
          }
        ]
      },
      {
        path: "addTodo/:type",
        element: <AddTodo />
      },
      {
        path: "updateTodo/:id",
        element: <AddTodo />
      },
      {
        path: "todoItemMenu/:id",
        element: <TodoItemMenu />
      }
    ]
  },
]);
