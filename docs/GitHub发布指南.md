# 🚀 GitHub Release 发布指南

本指南适用于项目维护者发布新版本。

## 发布前准备

### 1. 更新版本号

编辑 `package.json`:
```json
{
  "version": "1.0.1"
}
```

### 2. 更新 CHANGELOG

在 `CHANGELOG.md` 中记录本次更新内容。

### 3. 提交代码

```bash
git add .
git commit -m "Release v1.0.1"
git push origin main
```

## 构建发布文件

### 清理旧文件

```bash
# PowerShell (Windows)
Remove-Item -Path "release" -Recurse -Force -ErrorAction SilentlyContinue

# Bash (Linux/macOS)
rm -rf release
```

### 重新构建

```bash
npm run build
```

### 打包各平台

**Windows:**
```bash
npm run package:win
```

生成文件:
- `release/Magpie Setup {version}.exe` - 安装程序
- `release/Magpie {version}.exe` - 便携版

**Linux (在 Windows 上):**
```bash
# 打包为 zip
Compress-Archive -Path "release\linux-unpacked\*" -DestinationPath "release\Magpie-{version}-linux-x64.zip" -Force
```

**macOS (需要在 macOS 上运行):**
```bash
npm run package:mac
```

### 生成校验和

```bash
cd release
Get-FileHash -Algorithm SHA256 *.exe,*.zip | Format-Table Hash,Path
```

## 创建 GitHub Release

### 方法 A: 通过 Web 界面

1. 访问 https://github.com/yourusername/magpie/releases/new

2. 填写信息:
   - **Tag**: `v1.0.1`
   - **Title**: `Magpie v1.0.1 - 更新说明`
   - **Description**: 复制 CHANGELOG 中的更新内容

3. 上传文件:
   - Windows 安装程序
   - Windows 便携版
   - Linux 压缩包
   - 校验和文件（可选）

4. 勾选 "Set as the latest release"

5. 点击 "Publish release"

### 方法 B: 使用 GitHub CLI

```bash
gh release create v1.0.1 \
  "release/Magpie.Setup.1.0.1.exe" \
  "release/Magpie.1.0.1.exe" \
  "release/Magpie-1.0.1-linux-x64.zip" \
  --title "Magpie v1.0.1" \
  --notes "更新内容请查看 CHANGELOG.md"
```

## Release 描述模板

```markdown
# Magpie v1.0.1

## 🆕 新功能

- 添加功能 A
- 添加功能 B

## 🐛 Bug 修复

- 修复问题 X
- 修复问题 Y

## 📦 下载

### Windows
- **安装程序**: `Magpie.Setup.1.0.1.exe`
- **便携版**: `Magpie.1.0.1.exe`

### Linux
- **压缩包**: `Magpie-1.0.1-linux-x64.zip`

## 📋 系统要求

- **Windows**: Windows 10+ (64位)
- **Linux**: 现代 Linux 发行版 (64位)
- **macOS**: macOS 10.13+

## 📚 文档

- [快速开始](./docs/快速开始.md)
- [功能特性](./docs/功能特性.md)
- [安装指南](./docs/安装指南.md)
```

## 发布后工作

### 1. 验证

- 测试所有下载链接
- 在干净的系统上测试安装
- 验证功能是否正常

### 2. 宣传

- 在 README 中更新徽章
- 撰写发布公告
- 在社区分享

### 3. 监控

- 关注 GitHub Issues
- 及时回复用户反馈
- 收集改进建议

## 版本号规范

遵循[语义化版本](https://semver.org/)：

- **Major (1.x.x)**: 不兼容的 API 变更
- **Minor (x.1.x)**: 向下兼容的新功能
- **Patch (x.x.1)**: 向下兼容的问题修复

## 自动化发布（可选）

可以使用 GitHub Actions 自动化发布流程。创建 `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      - run: npm run package:win
      
      - uses: softprops/action-gh-release@v1
        with:
          files: release/*.exe
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

**需要帮助？** 查看 [GitHub 官方文档](https://docs.github.com/zh/repositories/releasing-projects-on-github)

