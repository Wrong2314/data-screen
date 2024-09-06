import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

/*
  RouteRecordRaw是Vue Router的一个类型定义，它用于描述路由配置的对象。它包含以下属性：
  path：字符串，表示路由的路径。
  name：字符串，表示路由的名称。
  component：组件类型，表示路由所匹配的组件。
  children：子路由配置数组，用于描述嵌套路由。
  meta：对象，用于存储额外的路由元数据，例如需要验证用户权限的信息。
*/

//引入main.ts
import app from "../main";

// 引入路由模块
import noFondPage from "./not-found";
// pinia路由
import pinia from "./modules/pinia-store";

const routes: Array<RouteRecordRaw> = [
  // 重定向
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
  pinia,
  // 404页面需要放在最后！
  noFondPage,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Vue3 router守卫
// 在路由跳转之前，开启loading，路由跳转之后，关闭loading
router.beforeEach((to, from, next) => {
  if (to.meta.loading) {
    app.config.globalProperties.$loading.showLoading();
    next();
  } else {
    next();
  }
});
router.afterEach((to) => {
  if (to.meta.loading) {
    app.config.globalProperties.$loading.hideLoading();
  }
});
export default router;
