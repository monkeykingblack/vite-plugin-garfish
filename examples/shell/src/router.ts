import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import HomeView from "./components/home-view.vue";
import { SubAppConfgiure } from "./config";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomeView,
  },
  ...SubAppConfgiure.map((app) => ({
    path: `/${app.name}`,
    component: () => import("./components/sub-app-view.vue"),
    props: app,
  })),
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
