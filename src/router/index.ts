import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import noFondPage from "./not-found";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home-page/home-page.vue"),
    meta: {
      loading: true,
    },
  },
  noFondPage,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
