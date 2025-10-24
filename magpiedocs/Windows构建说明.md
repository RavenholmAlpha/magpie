# Magpie Windows 应用构建说明

## 🎉 构建成功！

Windows 应用已成功构建，生成的文件位于 `release` 目录。

## 📦 构建产物

### 1. 安装程序（推荐使用）
```
📄 release/Magpie Setup 1.0.0.exe
大小: ~130 MB
类型: NSIS 安装程序
```

**特点：**
- ✅ 一键安装
- ✅ 自动创建桌面快捷方式
- ✅ 添加到开始菜单
- ✅ 支持卸载
- ✅ 自动更新支持（如果配置）

**使用方法：**
1. 双击 `Magpie Setup 1.0.0.exe`
2. 按照安装向导操作
3. 安装完成后自动启动

### 2. 免安装版本
```
📁 release/win-unpacked/
包含: Magpie.exe 和所有依赖文件
```

**特点：**
- ✅ 无需安装
- ✅ 绿色便携
- ✅ 可放在U盘使用

**使用方法：**
1. 进入 `release/win-unpacked/` 目录
2. 双击 `Magpie.exe` 启动

## 📊 文件大小

| 文件 | 大小 | 说明 |
|------|------|------|
| Magpie Setup 1.0.0.exe | ~130 MB | 安装程序 |
| win-unpacked/ | ~250 MB | 免安装版本 |

## 🚀 分发方式

### 方式 1：分发安装程序（推荐）
```
只需分发: Magpie Setup 1.0.0.exe
用户体验: 最佳
```

### 方式 2：分发免安装版本
```
打包: win-unpacked/ 整个文件夹为 ZIP
优点: 用户无需管理员权限
```

## 💡 使用建议

### 对于普通用户
推荐使用 `Magpie Setup 1.0.0.exe`：
- 简单易用
- 专业的安装体验
- 自动创建快捷方式

### 对于技术用户
可以使用 `win-unpacked/Magpie.exe`：
- 无需安装
- 完全便携
- 可自定义存放位置

## 📝 系统要求

### 最低配置
- **操作系统:** Windows 7 SP1 或更高版本
- **架构:** 64-bit (x64)
- **内存:** 2 GB RAM
- **磁盘空间:** 300 MB

### 推荐配置
- **操作系统:** Windows 10/11
- **架构:** 64-bit (x64)
- **内存:** 4 GB RAM 或更多
- **磁盘空间:** 500 MB

## 🔧 构建详情

### 构建命令
```bash
npm run build      # 构建代码
npm run package    # 打包应用
```

### 构建配置（package.json）
```json
"build": {
  "appId": "com.magpie.app",
  "productName": "Magpie",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "package.json"
  ],
  "win": {
    "target": "nsis"
  }
}
```

### 使用的工具
- **Electron:** v28.3.3
- **Electron Builder:** v24.13.3
- **Node.js:** 当前版本
- **Vite:** v5.4.21

## 📋 构建日志摘要

```
✓ Renderer 构建完成
  - index.html: 0.49 kB
  - CSS: 40.67 kB
  - JS: 228.24 kB

✓ Electron 编译完成
  - TypeScript → JavaScript
  - 输出到 dist/main/

✓ Windows 打包完成
  - 平台: win32 x64
  - 目标: NSIS
  - 输出: Magpie Setup 1.0.0.exe
```

## ⚠️ 注意事项

### 1. 默认图标
当前使用 Electron 默认图标。如需自定义：
```
在 package.json 中添加:
"build": {
  "win": {
    "icon": "path/to/icon.ico"
  }
}
```

### 2. 代码签名
当前未进行代码签名，Windows 可能显示警告。
要添加签名，需要：
1. 获取代码签名证书
2. 配置 electron-builder

### 3. 防病毒软件
首次运行时，某些防病毒软件可能会扫描或拦截。
这是正常现象，因为应用未签名。

## 🎨 应用特性

当前构建包含以下功能：
- ✅ 变量自动补全
- ✅ 环境管理
- ✅ 请求历史
- ✅ Collection 管理
- ✅ 6 个主题预设
- ✅ 自定义主题
- ✅ 代码生成
- ✅ 响应美化

## 📦 如何分发

### 上传到文件共享
```
1. 上传 Magpie Setup 1.0.0.exe
2. 提供下载链接
3. 附上安装说明
```

### 创建发布包
```bash
# 方法 1：只打包安装程序
tar -czf Magpie-v1.0.0-win64-installer.zip "Magpie Setup 1.0.0.exe"

# 方法 2：打包免安装版本
cd release
tar -czf Magpie-v1.0.0-win64-portable.zip win-unpacked/
```

### GitHub Release（如果使用）
```
1. 创建 Git tag: v1.0.0
2. 上传构建产物
3. 编写 Release Notes
```

## 🔄 更新构建

如果修改了代码，重新构建：
```bash
# 完整构建
npm run build
npm run package

# 或者一次性执行
npm run build && npm run package
```

## 🐛 故障排查

### 问题 1：构建失败
**可能原因：**
- 依赖未安装

**解决方法：**
```bash
npm install
npm run build
npm run package
```

### 问题 2：应用无法启动
**可能原因：**
- 缺少必要文件
- 防病毒软件拦截

**解决方法：**
- 确保所有文件完整
- 添加到防病毒软件白名单

### 问题 3：安装程序运行慢
**原因：**
- Windows Defender 扫描

**说明：**
- 这是正常现象
- 签名后可改善

## 📝 版本信息

- **应用名称:** Magpie
- **版本号:** 1.0.0
- **构建日期:** 2025-10-24
- **构建平台:** Windows x64
- **Electron 版本:** 28.3.3

## 🎯 下一步

### 改进建议

1. **添加应用图标**
   - 创建 256x256 的 .ico 文件
   - 更新 build 配置

2. **代码签名**
   - 获取证书
   - 配置签名
   - 提升可信度

3. **自动更新**
   - 配置更新服务器
   - 添加更新检查
   - 实现增量更新

4. **多语言支持**
   - 添加语言包
   - 国际化界面
   - 本地化内容

5. **性能优化**
   - 代码分割
   - 懒加载
   - 减小包体积

## 📞 技术支持

如果遇到问题：
1. 查看本文档的故障排查部分
2. 检查系统要求
3. 尝试重新构建
4. 查看构建日志

## 🎊 总结

✅ **构建成功！**

你现在有两种分发方式：
1. **Magpie Setup 1.0.0.exe** - 专业安装程序
2. **win-unpacked/** - 便携版本

选择适合你的分发方式，开始使用 Magpie 吧！

---

**构建位置:** `release/`
**推荐使用:** `Magpie Setup 1.0.0.exe`
**立即体验:** 双击安装程序开始安装！

