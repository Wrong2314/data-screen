// vite.config.ts
import { defineConfig } from "file:///D:/%E6%A1%8C%E9%9D%A2/Vite--Ts--Vue3---template-main/node_modules/.pnpm/vite@4.2.0_@types+node@18.15.11_sass@1.60.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E6%A1%8C%E9%9D%A2/Vite--Ts--Vue3---template-main/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.2.0_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/%E6%A1%8C%E9%9D%A2/Vite--Ts--Vue3---template-main/node_modules/.pnpm/unplugin-auto-import@0.15.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/%E6%A1%8C%E9%9D%A2/Vite--Ts--Vue3---template-main/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/%E6%A1%8C%E9%9D%A2/Vite--Ts--Vue3---template-main/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import * as path from "path";
var vite_config_default = defineConfig({
  // 配置打包后的相对路径
  base: "./",
  //配置别名
  resolve: {
    // 需要在tsconfig.json的compilerOptions中配置paths
    alias: {
      "@": path.resolve("./src"),
      // @代替src
      "~": path.resolve("./src/components"),
      // @代替src/components
    },
  },
  //  plugins插件
  plugins: [
    vue(),
    //vue
    AutoImport({
      //plus按需引入
      resolvers: [ElementPlusResolver()],
      //引入vue 自动注册api插件
      imports: ["vue", "vue-router", "pinia"],
      // 配置需要自动导入的库
      dts: "auto-import.d.ts",
      // 自动引入生成api的地址
      eslintrc: {
        enabled: false,
        // 是否开启eslint
        filepath: "./.eslintrc-auto-import.json",
        // eslint配置文件地址
        globalsPropValue: true,
        // 是否开启全局变量
      },
    }),
    Components({
      //plus按需引入
      resolvers: [ElementPlusResolver()],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ["vue", "md"],
      dts: "components.d.ts",
      //自动引入生成的组件的地址
    }),
  ],
  // 打包配置
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // 跨域
  server: {
    //使用IP能访问
    host: "0.0.0.0",
    //端口号
    port: 8888,
    // 热更新
    hmr: true,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //自定义代理规则
    proxy: {
      // 选项写法
      "/api": {
        // 1 目标路径 这里相当于公共的地址
        target: "https://api.oioweb.cn/api/ai/chat",
        //2 允许跨域
        changeOrigin: true,
        // 3 重写路径
        rewrite: (path2) => path2.replace(/^\/api/, ""),
      },
    },
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcVml0ZS0tVHMtLVZ1ZTMtLS10ZW1wbGF0ZS1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcVml0ZS0tVHMtLVZ1ZTMtLS10ZW1wbGF0ZS1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlQTElOEMlRTklOUQlQTIvVml0ZS0tVHMtLVZ1ZTMtLS10ZW1wbGF0ZS1tYWluL3ZpdGUuY29uZmlnLnRzXCI7Ly8gXHU1QkZDXHU1MTY1IHZpdGUgXHU2M0QyXHU0RUY2XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuLy8gXHU1QkZDXHU1MTY1IHZ1ZSBcdTYzRDJcdTRFRjZcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuLy8gXHU1QkZDXHU1MTY1XHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU2M0QyXHU0RUY2XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuLy8gXHU1QkZDXHU1MTY1XHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU3RUM0XHU0RUY2XHU3Njg0XHU2M0QyXHU0RUY2XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBcdTkxNERcdTdGNkVcdTYyNTNcdTUzMDVcdTU0MEVcdTc2ODRcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcbiAgYmFzZTogXCIuL1wiLFxuICAvL1x1OTE0RFx1N0Y2RVx1NTIyQlx1NTQwRFxuICByZXNvbHZlOiB7XG4gICAgLy8gXHU5NzAwXHU4OTgxXHU1NzI4dHNjb25maWcuanNvblx1NzY4NGNvbXBpbGVyT3B0aW9uc1x1NEUyRFx1OTE0RFx1N0Y2RXBhdGhzXG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIuL3NyY1wiKSwgLy8gQFx1NEVFM1x1NjZGRnNyY1xuICAgICAgXCJ+XCI6IHBhdGgucmVzb2x2ZShcIi4vc3JjL2NvbXBvbmVudHNcIiksIC8vIEBcdTRFRTNcdTY2RkZzcmMvY29tcG9uZW50c1xuICAgIH0sXG4gIH0sXG4gIC8vICBwbHVnaW5zXHU2M0QyXHU0RUY2XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSwgLy92dWVcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIC8vcGx1c1x1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIC8vXHU1RjE1XHU1MTY1dnVlIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q2FwaVx1NjNEMlx1NEVGNlxuICAgICAgaW1wb3J0czogW1widnVlXCIsIFwidnVlLXJvdXRlclwiLCBcInBpbmlhXCJdLCAvLyBcdTkxNERcdTdGNkVcdTk3MDBcdTg5ODFcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTc2ODRcdTVFOTNcbiAgICAgIGR0czogXCJhdXRvLWltcG9ydC5kLnRzXCIsIC8vIFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1NzUxRlx1NjIxMGFwaVx1NzY4NFx1NTczMFx1NTc0MFxuICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRmVzbGludFxuICAgICAgICBmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXCIsIC8vIGVzbGludFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NTczMFx1NTc0MFxuICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkZcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcbiAgICAgIH0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICAvL3BsdXNcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjVcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdTk3MDBcdTg5ODFcdTVDMDZcdTU0RUFcdTRFOUJcdTU0MEVcdTdGMDBcdTdDN0JcdTU3OEJcdTc2ODRcdTY1ODdcdTRFRjZcdThGREJcdTg4NENcdTgxRUFcdTUyQThcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjVcbiAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCJdLFxuICAgICAgZHRzOiBcImNvbXBvbmVudHMuZC50c1wiLCAvL1x1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1NzUxRlx1NjIxMFx1NzY4NFx1N0VDNFx1NEVGNlx1NzY4NFx1NTczMFx1NTc0MFxuICAgIH0pLFxuICBdLFxuICAvLyBcdTYyNTNcdTUzMDVcdTkxNERcdTdGNkVcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6IFwidGVyc2VyXCIsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgLy9cdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY1RjZcdTc5RkJcdTk2NjRjb25zb2xlXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLy8gXHU4REU4XHU1N0RGXG4gIHNlcnZlcjoge1xuICAgIC8vXHU0RjdGXHU3NTI4SVBcdTgwRkRcdThCQkZcdTk1RUVcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAvL1x1N0FFRlx1NTNFM1x1NTNGN1xuICAgIHBvcnQ6IDg4ODgsXG4gICAgLy8gXHU3MEVEXHU2NkY0XHU2NUIwXG4gICAgaG1yOiB0cnVlLFxuICAgIC8vXHU4QkJFXHU0RTNBIHRydWUgXHU2NUY2XHU4MkU1XHU3QUVGXHU1M0UzXHU1REYyXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU0RjFBXHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHVGRjBDXHU4MDBDXHU0RTBEXHU2NjJGXHU1QzFEXHU4QkQ1XHU0RTBCXHU0RTAwXHU0RTJBXHU1M0VGXHU3NTI4XHU3QUVGXHU1M0UzXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgLy9cdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc0MDZcdTg5QzRcdTUyMTlcbiAgICBwcm94eToge1xuICAgICAgLy8gXHU5MDA5XHU5ODc5XHU1MTk5XHU2Q0Q1XG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICAvLyAxIFx1NzZFRVx1NjgwN1x1OERFRlx1NUY4NCBcdThGRDlcdTkxQ0NcdTc2RjhcdTVGNTNcdTRFOEVcdTUxNkNcdTUxNzFcdTc2ODRcdTU3MzBcdTU3NDBcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vYXBpLm9pb3dlYi5jbi9hcGkvYWkvY2hhdFwiLFxuICAgICAgICAvLzIgXHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgLy8gMyBcdTkxQ0RcdTUxOTlcdThERUZcdTVGODRcbiAgICAgICAgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUU3QixPQUFPLFNBQVM7QUFFaEIsT0FBTyxnQkFBZ0I7QUFFdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFFcEMsWUFBWSxVQUFVO0FBRXRCLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUEsRUFFMUIsTUFBTTtBQUFBO0FBQUEsRUFFTixTQUFTO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLEtBQVUsYUFBUSxPQUFPO0FBQUE7QUFBQSxNQUN6QixLQUFVLGFBQVEsa0JBQWtCO0FBQUE7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBO0FBQUEsSUFDSixXQUFXO0FBQUE7QUFBQSxNQUVULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBO0FBQUEsTUFFakMsU0FBUyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUE7QUFBQSxNQUN0QyxLQUFLO0FBQUE7QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLFFBQ1QsVUFBVTtBQUFBO0FBQUEsUUFDVixrQkFBa0I7QUFBQTtBQUFBLE1BQ3BCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUE7QUFBQSxNQUVULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBO0FBQUEsTUFFakMsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBLE1BQ3hCLEtBQUs7QUFBQTtBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxRQUFRO0FBQUE7QUFBQSxJQUVOLE1BQU07QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBO0FBQUEsSUFFTixLQUFLO0FBQUE7QUFBQSxJQUVMLFlBQVk7QUFBQTtBQUFBLElBRVosT0FBTztBQUFBO0FBQUEsTUFFTCxRQUFRO0FBQUE7QUFBQSxRQUVOLFFBQVE7QUFBQTtBQUFBLFFBRVIsY0FBYztBQUFBO0FBQUEsUUFFZCxTQUFTLENBQUNBLFVBQWlCQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
