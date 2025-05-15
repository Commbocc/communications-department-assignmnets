import { $fetch } from "ofetch";
import type { Plugin } from "vite";
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

const mainClient = createContentstackRestClient({
  api_key: "blteea73b27b731f985",
  access_token: "csea4ca34f1df9f112165ac6e8",
});

const dataClient = createContentstackRestClient({
  api_key: "blt3d3b3d6d65010620",
  access_token: "cs2363b0533f18a744089c3136",
});

export const ContentstackDataPlugin = (): Plugin => {
  return {
    name: "contentstack-data-plugin",
    async config(_config, _env) {
      await fetchData();
    },
  };
};

/**
 *
 */
async function fetchData() {
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
}
