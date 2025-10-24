# Magpie - HTTP API 测试工具

<div align="center">
  <h3>🚀 一个现代化的HTTP API测试工具</h3>
  <p>功能强大、界面美观的API测试客户端，类似Postman</p>
</div>

## ✨ 特性

- 🌐 **完整的HTTP方法支持** - GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- 📝 **请求配置** - URL参数、请求头、请求体（JSON、表单等）
- 📊 **响应查看** - 美观的响应展示，包括状态码、响应头、响应体
- 📚 **集合管理** - 组织和管理API请求集合
- 🕐 **历史记录** - 自动保存请求历史
- 🌍 **环境变量** - 支持多环境变量配置
- 🎨 **现代化UI** - 简洁美观的用户界面
- ⚡ **快速响应** - 高性能的请求处理

## 🛠️ 技术栈

- **Electron** - 跨平台桌面应用框架
- **React** - 用户界面库
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **Axios** - HTTP客户端
- **Monaco Editor** - 代码编辑器（VS Code同款）

## 📦 安装

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建

```bash
# 构建应用
npm run build

# 打包应用
npm run package
```

## 🚀 使用指南

### 发送HTTP请求

1. 选择HTTP方法（GET、POST等）
2. 输入API URL
3. 配置请求参数、请求头、请求体
4. 点击"发送"按钮
5. 查看响应结果

### 管理集合

1. 点击侧边栏的"集合"
2. 创建新集合
3. 添加请求到集合
4. 组织和管理你的API请求

### 环境变量

1. 点击右上角的环境选择器
2. 创建新环境
3. 添加变量（如：base_url, api_key）
4. 在请求中使用变量：`{{variable_name}}`

## 📖 项目结构

```
magpie/
├── src/
│   ├── main/           # Electron主进程
│   ├── renderer/       # React渲染进程
│   │   ├── components/ # React组件
│   │   ├── hooks/      # 自定义Hooks
│   │   ├── types/      # TypeScript类型定义
│   │   ├── utils/      # 工具函数
│   │   └── App.tsx     # 主应用组件
│   └── preload/        # 预加载脚本
├── public/             # 静态资源
├── dist/               # 编译输出
└── package.json
```

## 🤝 贡献

欢迎提交问题和拉取请求！

## 📄 许可证

MIT License

## 🌟 致谢

灵感来源于Postman、Insomnia等优秀的API测试工具。

