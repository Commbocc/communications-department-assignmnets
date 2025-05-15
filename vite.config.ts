import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ContentstackDataPlugin } from "./plugins/contentstack";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: "/communications-department-assignmnets",

    plugins: [vue(), tailwindcss(), ContentstackDataPlugin()],

    build: {
      lib: {
        entry: resolve(__dirname, "src/lib.js"),
        name: "HcCommunicationsDepartmentAssignments",
        // fileName: "",
        // formats:[]
      },
    },

    define: {
      "process.env": JSON.stringify(process.env),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    resolve: {
      alias: [
        {
          find: "~~",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "~~types",
          replacement: fileURLToPath(new URL("./types", import.meta.url)),
        },
      ],
    },
  };
});
