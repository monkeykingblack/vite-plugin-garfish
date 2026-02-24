import { type interfaces } from "garfish";

export const SubAppConfgiure: interfaces.AppInfo[] = [
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
];
