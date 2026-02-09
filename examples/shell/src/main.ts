import Garfish from "garfish";

import "./style.css";

Garfish.registerApp({
  name: "react",
  activeWhen: "/react",
  entry: "http://localhost:3001",
});

Garfish.registerApp({
  name: "vue",
  activeWhen: "/vue",
  entry: "http://localhost:3002",
});

Garfish.run({
  disablePreloadApp: false,
  domGetter: "#app",
});
