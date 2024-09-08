`这是一个使用 Vue3 和 TypeScript 作为主要技术栈，使用 Vite 作为构建工具，使用 pnpm 作为包管理工具的项目。该项目集成了 eslint、prettier、stylelint、husky、router、vuex 和 axios。`

### 效果图

![](https://cdn.nlark.com/yuque/0/2024/png/25477848/1725806351991-8c6b8173-27ae-4f2c-9c68-19422f493a2a.png)

### 数据管理/结构图

![](https://cdn.nlark.com/yuque/0/2024/png/25477848/1725806357757-d7af30d8-91f7-429d-834c-c406752d3851.png)

#### ⛱️ 项目结构

```
├── .husky
│   ├── commit-msg // 获取提交信息，保证规范格式提交
│   ├── pre-commit // 提交之前
├── public
│   ├── index.html
├── .vscode
│   ├── settings.json
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── App.vue
│   ├── main.ts
├── .eslintrc.cjs
├── .prettierrc.cjs
├── .stylelintrc.cjs
├── package.json
├── tsconfig.node.json
├── pnpm-lock.yaml
├── README.md
├── vite.config.ts
├── ...
```

#### 🏭 技术栈说明

- Vue3：一款流行的前端框架，使用 Composition API 和 Tree-Shaking 技术提高开发效率和性能。
- TypeScript：一种 JavaScript 的超集，增加了静态类型检查和面向对象编程等特性，提高代码的可读性和可维护性。
- Vite：一个快速的 Web 开发构建工具，利用 ES Modules 和浏览器原生的 import 机制实现了快速的开发和构建速度。
- pnpm：一个快速、可靠的包管理工具，支持多种包管理方式，如局部安装、全局安装、本地缓存等。
- eslint：JavaScript 代码检查工具，用于检查代码风格和语法错误。
- prettier：一款代码格式化工具，用于统一代码风格，提高代码的可读性。
- stylelint：CSS 代码检查工具，用于检查 CSS 代码风格和语法错误。
- router：Vue3 官方提供的路由管理工具，用于实现页面之间的跳转和参数传递。
- pinia 官方提供的状态管理工具，用于管理全局状态和数据流。
- axios：一款基于 Promise 的 HTTP 库，用于发送 AJAX 请求和处理响应数据。

#### ⚡ 使用说明

```base

# 安装依赖
pnpm install

# 运行项目
pnpm run dev

# 打包发布
pnpm run build
```
