# 🚀 Magpie v1.0.0 Release Checklist

## ✅ 已完成的准备工作

### 1. ✅ 代码和文档
- [x] README.md 已重写为专业的 GitHub 项目格式
- [x] 所有文档已整理到 `magpiedocs/` 目录
- [x] Release Notes 已准备（`RELEASE_NOTES.md`）
- [x] GitHub 发布指南已创建（`magpiedocs/GitHub发布指南.md`）

### 2. ✅ 构建和打包
- [x] 应用已完整构建（`dist/` 目录）
- [x] Windows 安装程序已生成（`release/Magpie.Setup.1.0.0.exe`）
- [x] Windows 便携版已生成（`release/Magpie.1.0.0.exe`）
- [x] Linux 版本已打包（`release/Magpie-1.0.0-linux-x64.zip`）
- [x] 文件校验和已生成（`release/SHA256SUMS-clean.txt`）

### 3. ✅ 配置优化
- [x] package.json 已优化（支持多平台打包）
- [x] 图标路径已修正为相对路径
- [x] 构建脚本已添加（`package:win`, `package:linux`, `package:mac`, `package:all`）

## 📦 发布文件清单

准备上传到 GitHub Release 的文件（位于 `release/` 目录）：

1. **Magpie.Setup.1.0.0.exe** (91.3 MB)
   - Windows 安装程序
   - SHA256: `3B1B20299B65332E87239F6CA571E1A86D860FCF3A29C9611142F946AB50D75D`

2. **Magpie.1.0.0.exe** (91.0 MB)
   - Windows 便携版
   - SHA256: `5F10284FD9014D93005F6A328331BFA4B29D8BF21ECFADC7A367A6CFF5553AB2`

3. **Magpie-1.0.0-linux-x64.zip**
   - Linux 64位版本
   - SHA256: `799B71726430F7F7BA3506F0BC07A6A64A651D8F01409AE2453819A1A808F739`

4. **SHA256SUMS-clean.txt** (可选)
   - 文件校验和清单

## 🎯 接下来的步骤

### 1. 提交和推送代码

```bash
# 切换到项目目录
cd H:\cussorproject\magpie

# 查看更改
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "Release v1.0.0: 首个正式版本

- 重写 README.md 为专业的 GitHub 项目格式
- 整理所有文档到 magpiedocs/ 目录
- 优化多平台构建配置
- 修复图标路径问题
- 生成 Windows 和 Linux 发布版本
- 添加发布文档和指南"

# 推送到 GitHub
git push origin main

# 创建并推送标签
git tag v1.0.0
git push origin v1.0.0
```

### 2. 创建 GitHub Release

#### 方法 A：通过 GitHub 网页界面

1. 访问：https://github.com/yourusername/magpie/releases
2. 点击 "Draft a new release"
3. 填写信息：
   - **Tag**: `v1.0.0`
   - **Title**: `Magpie v1.0.0 - 首个正式版本`
   - **Description**: 复制 `RELEASE_NOTES.md` 的内容
4. 上传文件：
   - `release/Magpie.Setup.1.0.0.exe`
   - `release/Magpie.1.0.0.exe`
   - `release/Magpie-1.0.0-linux-x64.zip`
   - `release/SHA256SUMS-clean.txt` (可选)
5. 勾选 "Set as the latest release"
6. 点击 "Publish release"

#### 方法 B：使用 GitHub CLI

```bash
gh release create v1.0.0 \
  "release/Magpie.Setup.1.0.0.exe" \
  "release/Magpie.1.0.0.exe" \
  "release/Magpie-1.0.0-linux-x64.zip" \
  "release/SHA256SUMS-clean.txt" \
  --title "Magpie v1.0.0 - 首个正式版本" \
  --notes-file RELEASE_NOTES.md
```

### 3. 验证发布

- [ ] 检查 Release 页面显示正常
- [ ] 测试所有下载链接
- [ ] 验证文件完整性（SHA256）
- [ ] 在干净的系统上测试安装程序
- [ ] 检查 README.md 中的链接是否正确

### 4. 发布后工作

- [ ] 在 README.md 中添加 Releases 徽章
- [ ] 撰写发布公告（博客/社交媒体）
- [ ] 在相关社区分享
- [ ] 监控 Issues 和用户反馈

## 📝 Release 描述模板

以下是推荐的 GitHub Release 描述（可直接使用）：

```markdown
# 🎉 Magpie v1.0.0 - 首个正式版本发布

Magpie 是一款功能强大、界面美观的现代化 HTTP API 测试工具，提供类似 Postman 的完整功能体验。

## ✨ 主要特性

- 🌐 **完整的 HTTP 支持** - 支持所有 HTTP 方法和请求类型
- 📊 **强大的响应处理** - 格式化展示、语法高亮、Monaco 编辑器
- 📚 **集合与环境管理** - 高效组织 API 请求，支持多环境配置
- 🎨 **主题定制系统** - 完全可自定义的界面主题
- 🛠️ **代码生成器** - 一键生成 cURL、JavaScript、Python、Node.js 代码
- ⚡ **智能补全** - 变量自动补全，提升工作效率
- 🕐 **历史记录** - 自动保存请求历史

## 📦 安装

### Windows
- **安装程序（推荐）**：下载 `Magpie.Setup.1.0.0.exe`，双击安装
- **便携版**：下载 `Magpie.1.0.0.exe`，无需安装直接运行

### Linux
1. 下载 `Magpie-1.0.0-linux-x64.zip`
2. 解压：`unzip Magpie-1.0.0-linux-x64.zip -d magpie`
3. 添加执行权限：`chmod +x magpie/magpie`
4. 运行：`./magpie/magpie`

### macOS
macOS 版本需要从源码构建，详见[开发指南](./magpiedocs/开发指南.md)

## 📋 系统要求

- **Windows**: Windows 10+ (64位)
- **Linux**: 现代 Linux 发行版 (64位)
- **macOS**: macOS 10.13+ (Intel/Apple Silicon)

## 🔐 文件校验

下载后建议验证文件完整性，SHA256 校验和：

```
3B1B20299B65332E87239F6CA571E1A86D860FCF3A29C9611142F946AB50D75D  Magpie.Setup.1.0.0.exe
5F10284FD9014D93005F6A328331BFA4B29D8BF21ECFADC7A367A6CFF5553AB2  Magpie.1.0.0.exe
799B71726430F7F7BA3506F0BC07A6A64A651D8F01409AE2453819A1A808F739  Magpie-1.0.0-linux-x64.zip
```

## 📚 文档

- [完整功能文档](./magpiedocs/features.md)
- [快速开始指南](./magpiedocs/快速开始.md)
- [开发指南](./magpiedocs/开发指南.md)

## 🐛 问题反馈

如有问题或建议，请在 [Issues](https://github.com/yourusername/magpie/issues) 页面反馈。

---

**如果 Magpie 对您有帮助，请给我们一个 ⭐️ Star！**
```

## 📞 需要帮助？

- 📖 查看 [GitHub 发布指南](./magpiedocs/GitHub发布指南.md)
- 📖 查看 [Release 文件说明](./release/README.md)
- 💬 有问题？创建 [GitHub Issue](https://github.com/yourusername/magpie/issues)

## 🎉 恭喜！

所有发布准备工作已完成！现在可以开始发布流程了。

---

**准备人员**: Magpie Team  
**准备时间**: 2025-10-24  
**版本**: v1.0.0

