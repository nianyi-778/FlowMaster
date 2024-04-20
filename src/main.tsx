import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./styles.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'LXGW WenKai Screen',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
        },
      }}
    >

      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
