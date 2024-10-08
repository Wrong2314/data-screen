# Git 提交规范

为了使代码管理更加规范和清晰，我们需要将 Git 提交信息标准化。本文档将介绍我们的 Git 提交规范，希望能给大家提供参考。

## 提交信息格式

每一次的 Git 提交信息应该包括以下三部分：

```
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```

其中，只有`<type>(<scope>): <subject>`是必需的。
注意英文冒号并且加上空格

### 类型（type）

类型代表了本次提交的类型。我们定义了以下 标准类型：

- **feat**: 新功能
- **fix**: 修复问题
- **docs**: 文档修改
- **style**: 代码风格调整（比如修改空格、换行符等等，不影响代码含义的修改）
- **refactor**: 代码重构（既不是新增功能也不是修复问题的代码修改）
- **test**: 测试用例新增、修改、删除等
- **chore**: 对构建、打包工具、文档生成等辅助工具的修改
- **revert**：表示此次提交是撤销之前的某次提交
- **perf**：表示此次提交是对代码进行了优化，如改进了算法或数据结构等
- **build**：表示此次提交是对构建系统或外部依赖的修改，如升级了某个依赖库或修改了 CI/CD 配置等
- **ci**：表示此次提交是对 CI/CD 配置进行了修改，如增加了工作流或修改了触发条件等

### 范围（scope）

范围指的是本次提交的影响范围。当然，如果这次修复或新增的代码只涉及一个文件或者一个模块，那么 scope 可以不填。否则，请尽量填写。范围较大则用 \* 标识

### 主题（subject）

主题要求的是本次 Git 提交的简短描述，即该提交的标题。请尽量让标题简洁、清晰且含义明确。

### 正文（body）

正文是可选的，主要用于详细阐述本次提交的内容。尽管有些提交可能无需正文，但如果有困惑或者需求背景的话，正文会让 commit 更容易理解且阅读更加清晰。

### 页脚（footer）

页脚也是可选的，主要包含一些技术相关信息（例如 issue、break change 等），并允许跨项目追踪对应事项的信息。此外，还可以使用一些特殊的关键词，比如：

- `BREAKING CHANGE`: 改变代码库之前的 API，包括非向后兼容性修改之类的事项。
- `Closes`: 关闭一个 Issue。

## 示例

这里有几个例子。这并不是一个普遍适用的列表，请根据实际情况进行调整。

```
feat(users): 添加用户注册功能

新增了用户注册模块，包括前后端。
```

```
fix(common): 更新模块依赖

`common.js` 模块依赖于 `models.js` 模块，但文件修改导致依赖关系错误，已更正。
```

```
docs(readme): 修复错别字

在 README.md 中修改了拼写错误的单词。
```

## 参考资料

- [AngularJS Git Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
