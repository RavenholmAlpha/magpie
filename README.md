<div align="center">
  <img src="img/magpie.png" alt="Magpie Logo" width="120" height="120">
  
  # Magpie
  
  **一个功能强大、界面美观的现代化 HTTP API 测试工具**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Electron](https://img.shields.io/badge/Electron-28.0.0-blue.svg)](https://www.electronjs.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
  
  [English](#) | [简体中文](#)
</div>

---

## 📖 目录

- [简介](#-简介)
- [核心特性](#-核心特性)
- [快速开始](#-快速开始)
- [安装与使用](#-安装与使用)
- [功能展示](#-功能展示)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [开发指南](#-开发指南)
- [文档](#-文档)
- [路线图](#-路线图)
- [贡献](#-贡献)
- [许可证](#-许可证)
- [致谢](#-致谢)

---

## 🚀 简介

**Magpie** 是一款专为开发者打造的现代化 HTTP API 测试工具，提供类似 Postman 的功能体验，但具有更优雅的界面设计和更强大的功能特性。无论您是前端开发者、后端工程师还是测试人员，Magpie 都能帮助您更高效地进行 API 开发、测试和调试。

### 为什么选择 Magpie？

- **🎨 现代化界面**：简洁美观的用户界面，提供出色的用户体验
- **⚡ 高性能**：基于 Electron + React + TypeScript，响应迅速
- **🔒 隐私保护**：本地存储，数据完全受您控制
- **🎯 功能全面**：支持完整的 HTTP 方法、环境变量、集合管理等
- **🌙 主题定制**：支持自定义主题，打造专属风格
- **💻 跨平台**：支持 Windows、macOS、Linux

---

## ✨ 核心特性

### 🌐 完整的 HTTP 支持

- 支持所有 HTTP 方法：`GET`、`POST`、`PUT`、`DELETE`、`PATCH`、`HEAD`、`OPTIONS`
- 灵活的请求配置：URL 参数、请求头、请求体（JSON、表单、文件等）
- 多种认证方式：Basic Auth、Bearer Token、API Key 等

### 📊 强大的响应处理

- 美观的响应展示：格式化 JSON、语法高亮
- 详细的响应信息：状态码、响应时间、响应大小
- 响应预览：支持 HTML 页面预览
- Monaco 编辑器：VS Code 同款编辑器体验

### 📚 集合与环境管理

- **集合管理**：组织和管理相关的 API 请求
- **环境变量**：支持多环境配置（开发、测试、生产）
- **变量自动补全**：智能变量提示，提高效率
- **导入导出**：轻松分享和备份您的配置

### 🎨 主题定制

- 内置多种主题预设
- 完全可自定义的主题编辑器
- 实时预览主题效果
- 保存和分享自定义主题

### 🕐 历史记录

- 自动保存请求历史
- 快速回溯之前的请求
- 历史记录搜索和过滤

### 🛠️ 开发者友好

- 代码生成：自动生成多种语言的 HTTP 请求代码
  - cURL
  - JavaScript (Fetch)
  - Python (requests)
  - Node.js (Axios)
- 开发者工具集成
- 详细的错误提示

---

## 🚀 快速开始

### 前置要求

- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/yourusername/magpie.git

# 进入项目目录
cd magpie

# 安装依赖
npm install
```

### 启动开发环境

```bash
# 启动开发服务器
npm run dev
```

应用将自动启动并运行在开发模式。

---

## 📦 安装与使用

### 从源码构建

```bash
# 构建应用
npm run build

# 打包为可执行文件
npm run package
```

构建完成后，可执行文件将位于 `release` 目录中。

### 使用预编译版本

从 [Releases](https://github.com/yourusername/magpie/releases) 页面下载适合您操作系统的预编译版本：

- **Windows**：`Magpie Setup x.x.x.exe`
- **macOS**：`Magpie-x.x.x.dmg`
- **Linux**：`Magpie-x.x.x.AppImage`

---

## 🎯 功能展示

### 发送 HTTP 请求

1. 选择 HTTP 方法（GET、POST 等）
2. 输入 API URL
3. 配置请求参数、请求头、请求体
4. 点击"发送"按钮
5. 查看格式化的响应结果

### 使用环境变量

```
# 在环境中定义变量
base_url = https://api.example.com
api_key = your_api_key_here

# 在请求中使用变量
{{base_url}}/users?key={{api_key}}
```

### 集合管理

- 创建集合来组织相关的 API 请求
- 添加、编辑、删除请求
- 导出集合与团队共享
- 导入他人分享的集合

### 生成代码

选择任意请求，点击"生成代码"，即可获得多种编程语言的实现代码，方便集成到您的项目中。

---

## 🔧 技术栈

### 核心框架

- **[Electron](https://www.electronjs.org/)** - 跨平台桌面应用框架
- **[React](https://reactjs.org/)** - 用户界面库
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript 超集

### 构建工具

- **[Vite](https://vitejs.dev/)** - 快速的前端构建工具
- **[Electron Builder](https://www.electron.build/)** - 打包和分发工具

### 主要依赖

- **[Axios](https://axios-http.com/)** - HTTP 客户端
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - VS Code 同款代码编辑器
- **[Electron Store](https://github.com/sindresorhus/electron-store)** - 持久化存储
- **[UUID](https://github.com/uuidjs/uuid)** - 唯一标识符生成

---

## 📁 项目结构

```
magpie/
├── src/
│   ├── main/                 # Electron 主进程
│   │   ├── main.ts          # 主进程入口
│   │   └── store.ts         # 数据存储管理
│   ├── preload/             # 预加载脚本
│   │   └── preload.ts       # Electron API 桥接
│   └── renderer/            # React 渲染进程
│       ├── components/      # React 组件
│       │   ├── RequestPanel.tsx
│       │   ├── ResponsePanel.tsx
│       │   ├── Sidebar.tsx
│       │   ├── TopBar.tsx
│       │   ├── TitleBar.tsx
│       │   ├── ThemeEditor.tsx
│       │   ├── EnvironmentManager.tsx
│       │   └── ...
│       ├── hooks/          # 自定义 Hooks
│       ├── types/          # TypeScript 类型定义
│       ├── utils/          # 工具函数
│       │   ├── httpClient.ts
│       │   ├── codeGenerator.ts
│       │   ├── helpers.ts
│       │   └── ...
│       ├── styles/         # 样式文件
│       ├── App.tsx         # 主应用组件
│       └── main.tsx        # React 入口
├── public/                 # 静态资源
├── build/                  # 构建配置和图标
├── dist/                   # 编译输出
├── release/                # 打包输出
├── magpiedocs/            # 项目文档
│   ├── features.md        # 功能特性文档
│   ├── 开发指南.md         # 开发指南
│   ├── 快速开始.md         # 快速开始指南
│   └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💻 开发指南

### 开发环境设置

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/magpie.git
   cd magpie
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发模式**
   ```bash
   npm run dev
   ```

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发环境（热重载） |
| `npm run dev:renderer` | 仅启动渲染进程开发服务器 |
| `npm run dev:electron` | 仅启动 Electron 主进程 |
| `npm run build` | 构建生产版本 |
| `npm run build:renderer` | 构建渲染进程 |
| `npm run build:electron` | 构建主进程 |
| `npm run package` | 打包为可执行文件 |
| `npm start` | 运行打包后的应用 |

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 Hooks
- 保持代码简洁和可维护性

### 调试

- **主进程调试**：使用 VS Code 的 Electron 调试配置
- **渲染进程调试**：按 `Ctrl+Shift+I`（Windows/Linux）或 `Cmd+Option+I`（macOS）打开 DevTools

---

## 📚 文档

完整的文档位于 [`magpiedocs/`](./magpiedocs/) 目录：

- [功能特性文档](./magpiedocs/features.md) - 详细的功能介绍
- [快速开始指南](./magpiedocs/快速开始.md) - 新手入门教程
- [开发指南](./magpiedocs/开发指南.md) - 开发者文档
- [环境功能说明](./magpiedocs/环境功能完整说明.md) - 环境变量使用指南
- [主题定制说明](./magpiedocs/主题预设和管理功能说明.md) - 主题编辑器使用
- [Windows 构建说明](./magpiedocs/Windows构建说明.md) - Windows 平台构建指南

更多文档请查看 [magpiedocs](./magpiedocs/) 目录。

---

## 🗺️ 路线图

### 当前版本 (v1.0.0)

- ✅ 基础 HTTP 请求功能
- ✅ 集合管理
- ✅ 环境变量支持
- ✅ 历史记录
- ✅ 主题定制
- ✅ 代码生成
- ✅ 变量自动补全

### 计划中的功能

- [ ] 测试脚本支持（Pre-request Script & Tests）
- [ ] 批量请求运行器
- [ ] GraphQL 支持
- [ ] WebSocket 测试
- [ ] API 文档生成
- [ ] 团队协作功能
- [ ] 云端同步
- [ ] 插件系统
- [ ] 性能测试
- [ ] Mock Server

---

## 🤝 贡献

欢迎所有形式的贡献！无论是报告 Bug、提出新功能建议，还是提交代码改进。

### 如何贡献

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 贡献指南

- 提交前请确保代码通过所有测试
- 遵循项目的代码风格
- 为新功能添加适当的文档
- 保持 commit 信息清晰明了

### 报告问题

如果您发现了 Bug 或有功能建议，请在 [Issues](https://github.com/yourusername/magpie/issues) 页面提交。

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🌟 致谢

- 感谢 [Postman](https://www.postman.com/) 和 [Insomnia](https://insomnia.rest/) 提供的灵感
- 感谢 [Electron](https://www.electronjs.org/) 团队提供的优秀框架
- 感谢 [React](https://reactjs.org/) 和 [TypeScript](https://www.typescriptlang.org/) 社区
- 感谢所有贡献者和使用者的支持

---

<div align="center">
  
  **如果这个项目对您有帮助，请给它一个 ⭐️**
  
  Made with ❤️ by Magpie Team
  
  [官网](#) | [文档](./magpiedocs/) | [问题反馈](https://github.com/yourusername/magpie/issues) | [更新日志](#)
  
</div>
