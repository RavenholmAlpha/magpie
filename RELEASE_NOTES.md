# Magpie v1.0.0 Release Notes

🎉 **首个正式版本发布！**

Magpie 是一款功能强大、界面美观的现代化 HTTP API 测试工具，为开发者提供类似 Postman 的完整功能体验。

## ✨ 主要特性

### 🌐 完整的 HTTP 支持
- ✅ 支持所有 HTTP 方法：GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS
- ✅ 灵活的请求配置：URL 参数、请求头、请求体（JSON、表单、文件等）
- ✅ 多种认证方式：Basic Auth、Bearer Token、API Key

### 📊 强大的响应处理
- ✅ 美观的响应展示：格式化 JSON、语法高亮
- ✅ 详细的响应信息：状态码、响应时间、响应大小
- ✅ Monaco 编辑器：VS Code 同款编辑器体验

### 📚 集合与环境管理
- ✅ 集合管理：组织和管理相关的 API 请求
- ✅ 环境变量：支持多环境配置（开发、测试、生产）
- ✅ 变量自动补全：智能变量提示，提高效率
- ✅ 导入导出：轻松分享和备份配置

### 🎨 主题定制
- ✅ 内置多种主题预设
- ✅ 完全可自定义的主题编辑器
- ✅ 实时预览主题效果
- ✅ 保存和分享自定义主题

### 🛠️ 开发者友好
- ✅ 代码生成：自动生成 cURL、JavaScript、Python、Node.js 代码
- ✅ 开发者工具集成
- ✅ 详细的错误提示
- ✅ 历史记录自动保存

## 📦 下载

### Windows
- **[Magpie Setup 1.0.0.exe](https://github.com/yourusername/magpie/releases/download/v1.0.0/Magpie.Setup.1.0.0.exe)** - 安装程序（推荐）
- **[Magpie 1.0.0.exe](https://github.com/yourusername/magpie/releases/download/v1.0.0/Magpie.1.0.0.exe)** - 便携版（无需安装）

### Linux
- **[Magpie-1.0.0-linux-x64.zip](https://github.com/yourusername/magpie/releases/download/v1.0.0/Magpie-1.0.0-linux-x64.zip)** - Linux 64位版本

### macOS
> **注意**：macOS 版本需要在 macOS 系统上构建。如果您需要 macOS 版本，请参考 [构建文档](./magpiedocs/开发指南.md) 自行构建，或等待后续版本发布。

## 📋 系统要求

### Windows
- Windows 10 或更高版本
- 64位系统

### Linux
- 现代 Linux 发行版（Ubuntu 18.04+, Debian 10+, Fedora 32+ 等）
- 64位系统

### macOS
- macOS 10.13 或更高版本
- 支持 Intel 和 Apple Silicon

## 🚀 安装说明

### Windows

#### 使用安装程序
1. 下载 `Magpie Setup 1.0.0.exe`
2. 双击运行安装程序
3. 按照向导完成安装
4. 从开始菜单或桌面快捷方式启动 Magpie

#### 使用便携版
1. 下载 `Magpie 1.0.0.exe`
2. 将文件放置在任意目录
3. 双击运行即可使用

### Linux

1. 下载 `Magpie-1.0.0-linux-x64.zip`
2. 解压缩文件：
   ```bash
   unzip Magpie-1.0.0-linux-x64.zip -d magpie
   cd magpie
   ```
3. 添加执行权限：
   ```bash
   chmod +x magpie
   ```
4. 运行应用：
   ```bash
   ./magpie
   ```

### macOS

从源码构建：
```bash
git clone https://github.com/yourusername/magpie.git
cd magpie
npm install
npm run build
npm run package:mac
```

## 🆕 新功能详解

### 1. 变量自动补全
在 URL、请求头、请求体中输入 `{{` 即可触发变量自动补全，快速插入环境变量。

### 2. 代码生成器
点击"生成代码"按钮，可以将当前请求转换为：
- cURL 命令
- JavaScript (Fetch API)
- Python (requests)
- Node.js (Axios)

### 3. 主题编辑器
完全可自定义的主题系统，支持：
- 颜色自定义
- 实时预览
- 主题导入导出
- 多个预设主题

### 4. 集合管理
高效的请求组织方式：
- 创建多个集合
- 拖拽排序
- 批量导入导出
- 集合搜索

## 🐛 已知问题

- 在某些 Linux 发行版上，首次启动可能需要额外的依赖包
- 大文件上传功能待优化
- WebSocket 支持将在后续版本中添加

## 📝 更新日志

### v1.0.0 (2025-10-24)

#### 新增
- 🎉 首个正式版本发布
- ✨ 完整的 HTTP 请求功能
- ✨ 集合管理系统
- ✨ 环境变量支持
- ✨ 历史记录功能
- ✨ 主题定制系统
- ✨ 代码生成器
- ✨ 变量自动补全
- ✨ Monaco 代码编辑器集成
- ✨ 多平台支持（Windows、Linux、macOS）

#### 技术栈
- Electron 28.0.0
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.8
- Monaco Editor 0.45.0

## 🔮 未来计划

### v1.1.0
- [ ] 测试脚本支持（Pre-request Script & Tests）
- [ ] 批量请求运行器
- [ ] GraphQL 支持

### v1.2.0
- [ ] WebSocket 测试
- [ ] API 文档生成
- [ ] Mock Server

### v2.0.0
- [ ] 团队协作功能
- [ ] 云端同步
- [ ] 插件系统

## 🙏 致谢

感谢所有测试用户的反馈和建议！

## 📞 反馈与支持

- 🐛 报告问题：[GitHub Issues](https://github.com/yourusername/magpie/issues)
- 💬 功能建议：[GitHub Discussions](https://github.com/yourusername/magpie/discussions)
- 📧 联系我们：magpie@example.com

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE)

---

**如果 Magpie 对您有帮助，请给我们一个 ⭐️ Star！**


