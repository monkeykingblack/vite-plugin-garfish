import Garfish from "garfish";

import "./style.css";

import type { interfaces } from "garfish";

const config: interfaces.Options = {
  disablePreloadApp: true,
  domGetter: "#app",
  apps: [
    {
      name: "react",
      activeWhen: "/react",
      entry: "http://localhost:3001",
    },
    {
      name: "vue",
      activeWhen: "/vue",
      entry: "http://localhost:3002",
    },
  ],
};

Garfish.run(config);
