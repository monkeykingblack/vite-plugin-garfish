import { reactBridge } from "@garfish/bridge-react-v18";
import { createRoot } from "react-dom/client";

import RootComponent from "./root";

if (!window.__GARFISH__) {
  import("./index.css");
  createRoot(document.getElementById("root")!).render(<RootComponent />);
}

export const provider = reactBridge({
  el: "#root",
  rootComponent: RootComponent,
});
