import { createApp } from "vue";
import App from "./App.vue";
import DataVVue3 from "@kjgl77/datav-vue3";

// 按需引入element-plus只引入了需要的组件，但是样式文件是全局的，
import "element-plus/dist/index.css";

// 引入路由配置文件
import router from "./router/index.js";

// 引入全局重置样式文件
import "@/assets/css/reset.css";
// 引入全局样式文件
import "@/assets/css/global.scss";

// 引入pinia
import { createPinia } from "pinia";
// 创建pinia实例
const pinia = createPinia();

const app = createApp(App);
app.use(DataVVue3);
app.use(pinia).use(router).mount("#app");

export default app;
