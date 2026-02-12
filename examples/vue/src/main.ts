import { vueBridge } from "@garfish/bridge-vue-v3";
import { h, createApp } from "vue";

import App from "./app.vue";

if (!window.__GARFISH__) {
  import("./style.css");
  createApp(App).mount("#app");
}

export const provider = vueBridge({
  rootComponent: App,
  appOptions: () => {
    return {
      el: "#app",
      render: () => h(App),
    };
  },
});
