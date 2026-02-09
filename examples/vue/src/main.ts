import { vueBridge } from "@garfish/bridge-vue-v3";
import { createApp } from "vue";

import App from "./App.vue";

if (!window.__GARFISH__) {
  await import("./style.css");
  createApp(App).mount("#app");
}

export const provider = vueBridge({
  rootComponent: App,
});
