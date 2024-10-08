import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
