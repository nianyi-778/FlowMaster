import { Outlet, createHashRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import AddTodo from "@/pages/AddTodo";
import TodoItemMenu from "@/pages/TodoItemMenu";
import Quest from '@/pages/Quest'

export const router = createHashRouter([
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
        path: "quest",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Quest />
          }
        ]
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
