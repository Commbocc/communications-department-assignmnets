import { $fetch } from "ofetch";
import { loadEnv, type Plugin } from "vite";
import type {
  CommunicationsStaff,
  ContentTypeResponse,
  Department,
} from "../types/contentstack";
import { writeFileSync } from "fs";
import { resolve } from "path";

type ContentstackRestHeaders = {
  api_key: string;
  access_token: string;
  branch?: string;
};

/**
 *
 * @param param0
 * @returns
 */
function createContentstackRestClient({
  api_key,
  access_token,
  branch = "main",
}: ContentstackRestHeaders) {
  return $fetch.create({
    baseURL: "https://cdn.contentstack.io/v3",
    headers: {
      api_key,
      access_token,
      branch,
    },
  });
}

export const ContentstackDataPlugin = (): Plugin => {
  return {
    name: "contentstack-data-plugin",

    async config(_config, env) {
      process.env = { ...process.env, ...loadEnv(env.mode, process.cwd()) };

      const mainClient = createContentstackRestClient({
        api_key: process.env.VITE_CONTENTSTACK_MAIN_API_KEY ?? "",
        access_token: process.env.VITE_CONTENTSTACK_MAIN_ACCESS_TOKEN ?? "",
      });

      const dataClient = createContentstackRestClient({
        api_key: process.env.VITE_CONTENTSTACK_DATA_API_KEY ?? "",
        access_token: process.env.VITE_CONTENTSTACK_DATA_ACCESS_TOKEN ?? "",
      });

      const { entries: staffMemberEntries } = await dataClient<
        ContentTypeResponse<CommunicationsStaff>
      >("/content_types/communications_staff/entries", {
        query: {
          asc: "email",
        },
      });

      const { entries: departmentEntries } = await mainClient<
        ContentTypeResponse<Department>
      >("/content_types/department/entries", {
        query: {
          "only[BASE]": ["title", "url"],
          asc: "title",
        },
      });

      const data = JSON.stringify({
        staffMemberEntries,
        departmentEntries,
      });

      writeFileSync(resolve("./public/data.json"), data);
    },
  };
};
