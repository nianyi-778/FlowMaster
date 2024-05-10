import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import AddItem from "@/pages/AddItem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "AddItem",
        element: <AddItem />
      }
    ]
  },
]);
