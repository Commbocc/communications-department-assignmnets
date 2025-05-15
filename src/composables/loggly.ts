import { $fetch } from "ofetch";

const loggly = $fetch.create({
  baseURL:
    "https://logs-01.loggly.com/inputs/ff424bed-98df-4ab6-ac0e-49dc5d9ae378/tag/misc",
});

export const trackWithLoggly = async () => {
  const url = window.location.href;

  // @ts-ignore
  const version = __APP_VERSION__;

  // @ts-ignore
  if (!import.meta.env.PROD) {
    console.log(url, version);
    return;
  }

  await loggly("/", {
    method: "POST",
    body: {
      app: "communications-department-assignmnets",
      version,
      url,
    },
  });
};
