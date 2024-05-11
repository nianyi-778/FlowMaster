import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import AddTodo from "@/pages/AddTodo";

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
        path: "AddTodo",
        element: <AddTodo />
      }
    ]
  },
]);
