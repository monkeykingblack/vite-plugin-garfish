import { GarfishEsModule } from "@garfish/es-module";
import Garfish from "garfish";
import * as V from "vue";

import App from "./app.vue";
import { SubAppConfgiure } from "./config";
import { router } from "./router";

import "./style.css";

import type { interfaces } from "garfish";

V.createApp(App).use(router).mount("#root");

Garfish.setExternal({
  vue: V,
});

const config: interfaces.Options = {
  disablePreloadApp: true,
  basename: "/",
  domGetter: "#sub-app-container",
  plugins: [GarfishEsModule()],
  apps: SubAppConfgiure,
};

Garfish.run(config);
