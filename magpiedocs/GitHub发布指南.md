# GitHub Release 发布指南

本文档将指导您如何在 GitHub 上发布 Magpie 的新版本。

## 📋 前置准备

### 1. 确保代码已提交并推送

```bash
git add .
git commit -m "Release v1.0.0"
git push origin main
```

### 2. 确认已生成所有发布文件

运行以下命令生成发布文件：

```bash
# 重新构建
npm run build

# 清理旧的release
Remove-Item -Path "release" -Recurse -Force -ErrorAction SilentlyContinue

# 打包Windows版本
npm run package:win

# 打包Linux版本（压缩格式）
# Linux的AppImage在Windows上构建有限制，我们提供zip格式
Compress-Archive -Path "release\linux-unpacked\*" -DestinationPath "release\Magpie-1.0.0-linux-x64.zip" -Force
```

生成的文件应该包括：
- `release/Magpie Setup 1.0.0.exe` - Windows 安装程序
- `release/Magpie 1.0.0.exe` - Windows 便携版
- `release/Magpie-1.0.0-linux-x64.zip` - Linux 压缩包

## 🏷️ 创建 GitHub Release

### 方法一：通过 GitHub Web 界面

1. **访问仓库的 Releases 页面**
   - 打开你的 GitHub 仓库
   - 点击右侧的 "Releases"
   - 点击 "Draft a new release"

2. **填写 Release 信息**

   **Tag version（标签版本）：**
   ```
   v1.0.0
   ```
   
   **Release title（发布标题）：**
   ```
   Magpie v1.0.0 - 首个正式版本
   ```
   
   **Description（描述）：**
   
   复制 `RELEASE_NOTES.md` 的内容，或使用以下简化版本：

   ```markdown
   # 🎉 Magpie v1.0.0 - 首个正式版本发布

   Magpie 是一款功能强大、界面美观的现代化 HTTP API 测试工具。

   ## ✨ 主要特性

   - 🌐 完整的 HTTP 方法支持
   - 📊 强大的响应处理和可视化
   - 📚 集合与环境变量管理
   - 🎨 完全可定制的主题系统
   - 🛠️ 代码生成器（cURL、JavaScript、Python、Node.js）
   - 🕐 自动保存历史记录
   - ⚡ 变量自动补全

   ## 📦 安装

   ### Windows
   - **安装程序（推荐）**：下载 `Magpie.Setup.1.0.0.exe`
   - **便携版**：下载 `Magpie.1.0.0.exe`

   ### Linux
   - 下载 `Magpie-1.0.0-linux-x64.zip`
   - 解压后运行 `./magpie`

   ### macOS
   - 需要从源码构建（详见文档）

   ## 📋 系统要求

   - **Windows**: Windows 10+ (64位)
   - **Linux**: 现代 Linux 发行版 (64位)
   - **macOS**: macOS 10.13+ (Intel/Apple Silicon)

   ## 📚 文档

   - [完整功能文档](./magpiedocs/features.md)
   - [快速开始指南](./magpiedocs/快速开始.md)
   - [开发指南](./magpiedocs/开发指南.md)

   ## 🐛 问题反馈

   如有问题或建议，请在 [Issues](https://github.com/yourusername/magpie/issues) 页面反馈。

   ---

   **如果 Magpie 对您有帮助，请给我们一个 ⭐️ Star！**
   ```

3. **上传发布文件**

   点击 "Attach binaries by dropping them here or selecting them" 区域，上传以下文件：

   - `Magpie Setup 1.0.0.exe`（重命名为 `Magpie.Setup.1.0.0.exe`）
   - `Magpie 1.0.0.exe`（重命名为 `Magpie.1.0.0.exe`）
   - `Magpie-1.0.0-linux-x64.zip`

   > **提示**：为了让文件名在GitHub上更清晰，建议使用点号而不是空格。

4. **发布选项**

   - ✅ **Set as the latest release** - 设置为最新版本
   - ⬜ **Set as a pre-release** - 如果是预发布版本才勾选
   - ⬜ **Create a discussion for this release** - 可选，创建讨论

5. **发布**

   点击 **"Publish release"** 按钮完成发布。

### 方法二：使用 GitHub CLI

如果你安装了 GitHub CLI (`gh`)，可以使用命令行发布：

```bash
# 创建release并上传文件
gh release create v1.0.0 \
  "release/Magpie Setup 1.0.0.exe#Magpie.Setup.1.0.0.exe" \
  "release/Magpie 1.0.0.exe#Magpie.1.0.0.exe" \
  "release/Magpie-1.0.0-linux-x64.zip" \
  --title "Magpie v1.0.0 - 首个正式版本" \
  --notes-file RELEASE_NOTES.md
```

## 📝 Release 文件命名规范

建议的文件命名格式：

```
Windows 安装程序：  Magpie.Setup.{version}.exe
Windows 便携版：    Magpie.{version}.exe
Linux 压缩包：      Magpie-{version}-linux-x64.zip
macOS DMG：        Magpie-{version}.dmg
macOS ZIP：        Magpie-{version}-mac.zip
```

示例（v1.0.0）：
- `Magpie.Setup.1.0.0.exe`
- `Magpie.1.0.0.exe`
- `Magpie-1.0.0-linux-x64.zip`
- `Magpie-1.0.0.dmg`
- `Magpie-1.0.0-mac.zip`

## 🔄 更新版本号

发布新版本前，记得更新版本号：

### 1. 更新 package.json

```json
{
  "name": "magpie",
  "version": "1.0.1",  // 更新这里
  ...
}
```

### 2. 创建 Git 标签

```bash
git tag v1.0.1
git push origin v1.0.1
```

### 3. 版本号规范

遵循语义化版本（Semantic Versioning）：

- **主版本号（Major）**：不兼容的 API 修改
  - 例如：`1.0.0` → `2.0.0`
  
- **次版本号（Minor）**：向下兼容的功能新增
  - 例如：`1.0.0` → `1.1.0`
  
- **修订号（Patch）**：向下兼容的问题修正
  - 例如：`1.0.0` → `1.0.1`

## 📊 发布检查清单

发布前请确认：

- [ ] 代码已通过所有测试
- [ ] 版本号已更新（package.json）
- [ ] 更新日志已准备（RELEASE_NOTES.md）
- [ ] 所有平台的构建文件已生成
- [ ] 文件已正确命名
- [ ] README.md 已更新
- [ ] 所有更改已提交并推送
- [ ] 已创建 Git 标签
- [ ] 发布说明已准备
- [ ] 下载链接已验证

## 🎯 发布后的工作

1. **验证下载链接**
   - 测试每个下载链接是否正常工作
   - 确认文件完整性

2. **更新文档**
   - 在 README.md 中更新最新版本链接
   - 更新安装说明

3. **社交媒体宣传**
   - 在相关社区分享新版本
   - 撰写博客文章介绍新功能

4. **监控反馈**
   - 关注 GitHub Issues
   - 及时回复用户问题

## 🚀 自动化发布（高级）

### 使用 GitHub Actions 自动化发布

创建 `.github/workflows/release.yml`：

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: windows-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Package
        run: npm run package:win
      
      - name: Create Linux archive
        run: Compress-Archive -Path "release\linux-unpacked\*" -DestinationPath "release\Magpie-${{ github.ref_name }}-linux-x64.zip"
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            release/Magpie Setup *.exe
            release/Magpie *.exe
            release/Magpie-*-linux-x64.zip
          body_path: RELEASE_NOTES.md
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📞 需要帮助？

如有任何问题，请参考：
- [GitHub 官方文档 - 管理发布](https://docs.github.com/zh/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Electron Builder 文档](https://www.electron.build/)

---

祝发布顺利！🎉


