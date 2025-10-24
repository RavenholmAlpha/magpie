# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-24

### 🎉 首个正式版本发布

这是 Magpie 的第一个正式版本！

### Added

#### 核心功能
- ✨ 完整的 HTTP 请求支持（GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS）
- ✨ 灵活的请求配置（URL 参数、请求头、请求体）
- ✨ 美观的响应展示（格式化 JSON、语法高亮）
- ✨ 详细的响应信息（状态码、响应时间、响应大小）

#### 集合管理
- ✨ 创建和管理请求集合
- ✨ 集合导入导出功能
- ✨ 集合内请求组织和排序
- ✨ 集合搜索功能

#### 环境管理
- ✨ 多环境配置支持
- ✨ 环境变量系统
- ✨ 变量自动补全功能
- ✨ 环境快速切换

#### 主题系统
- ✨ 内置多种主题预设（暗色、亮色、护眼、高对比度等）
- ✨ 完全可自定义的主题编辑器
- ✨ 实时主题预览
- ✨ 主题导入导出

#### 开发者工具
- ✨ 代码生成器（cURL、JavaScript、Python、Node.js）
- ✨ Monaco 编辑器集成（VS Code 同款）
- ✨ 开发者工具集成
- ✨ 请求历史记录自动保存

#### 用户界面
- ✨ 现代化的用户界面设计
- ✨ 自定义标题栏
- ✨ 可调整大小的面板
- ✨ 键盘快捷键支持

### Technical

#### 技术栈
- Electron 28.0.0
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.8
- Monaco Editor 0.45.0
- Axios 1.6.2

#### 平台支持
- Windows 10+ (64位)
- Linux (64位)
- macOS 10.13+ (Intel/Apple Silicon)

### Fixed
- 🐛 修复顶栏 Logo 图标显示问题
- 🐛 修复环境选择器主题适配问题
- 🐛 修复变量自动补全性能问题
- 🐛 修复集合管理相关问题
- 🐛 修复 URL 输入框自适应问题

### Documentation
- 📚 完整的功能文档
- 📚 快速开始指南
- 📚 开发者指南
- 📚 Windows 构建说明
- 📚 GitHub 发布指南

---

## [Unreleased]

### Planned for v1.1.0
- [ ] 测试脚本支持（Pre-request Script）
- [ ] 测试断言（Tests）
- [ ] 批量请求运行器
- [ ] GraphQL 支持
- [ ] 请求链功能

### Planned for v1.2.0
- [ ] WebSocket 测试
- [ ] SSE (Server-Sent Events) 支持
- [ ] API 文档生成
- [ ] Mock Server
- [ ] 性能测试

### Planned for v2.0.0
- [ ] 团队协作功能
- [ ] 云端同步
- [ ] 插件系统
- [ ] API 监控
- [ ] 移动端应用

---

## Version History

- **v1.0.0** (2025-10-24) - 首个正式版本发布

---

**Note**: 本项目遵循[语义化版本](https://semver.org/lang/zh-CN/)规范。

[1.0.0]: https://github.com/yourusername/magpie/releases/tag/v1.0.0
[Unreleased]: https://github.com/yourusername/magpie/compare/v1.0.0...HEAD

