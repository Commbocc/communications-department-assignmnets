import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ContentstackDataPlugin } from "./plugins/contentstack";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
      "process.env.NODE_ENV": JSON.stringify(mode),
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
