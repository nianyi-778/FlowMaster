import { ConfigEnv, UserConfig, defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import pkg from "./package.json";

// https://vitejs.dev/config/

export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => {
              if (name === "theme") {
                return "";
              }
              return `antd/es/${name}/style`;
            },
          },
        ],
      }),
      electron({
        main: {
          // Shortcut of `build.lib.entry`.
          entry: "electron/main.ts",
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App");
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron",
              rollupOptions: {
                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: path.join(__dirname, "electron/preload.ts"),
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: "dist-electron",
              rollupOptions: {
                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer:
          process.env.NODE_ENV === "test"
            ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
              undefined
            : {},
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
        $electron: "/electron",
      },
    },
  };
});
