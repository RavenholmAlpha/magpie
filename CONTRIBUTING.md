# 贡献指南

感谢您考虑为 Magpie 做贡献！我们欢迎所有形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交信息规范](#提交信息规范)
- [报告问题](#报告问题)
- [提出功能建议](#提出功能建议)
- [Pull Request 流程](#pull-request-流程)

## 行为准则

参与本项目即表示您同意遵守我们的行为准则：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表现出同理心

## 如何贡献

### 贡献类型

我们欢迎以下类型的贡献：

- 🐛 **Bug 修复** - 修复已知问题
- ✨ **新功能** - 实现新功能
- 📝 **文档改进** - 改进或添加文档
- 🎨 **UI/UX 改进** - 改善用户界面和体验
- ⚡ **性能优化** - 提升应用性能
- 🧪 **测试** - 添加或改进测试
- 🌍 **国际化** - 添加或改进翻译

## 开发流程

### 1. Fork 仓库

点击页面右上角的 "Fork" 按钮，创建项目的副本到您的账户。

### 2. 克隆仓库

```bash
git clone https://github.com/your-username/magpie.git
cd magpie
```

### 3. 添加上游仓库

```bash
git remote add upstream https://github.com/original-owner/magpie.git
```

### 4. 创建分支

```bash
# 从 main 分支创建新分支
git checkout -b feature/your-feature-name

# 或者修复 bug
git checkout -b fix/issue-number-description
```

分支命名规范：
- `feature/` - 新功能
- `fix/` - Bug 修复
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `perf/` - 性能优化
- `test/` - 测试相关

### 5. 安装依赖

```bash
npm install
```

### 6. 开发

```bash
# 启动开发环境
npm run dev
```

### 7. 测试

确保您的更改不会破坏现有功能：

```bash
# 运行测试（待实现）
npm test

# 构建项目
npm run build
```

### 8. 提交更改

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

### 9. 推送到您的 Fork

```bash
git push origin feature/your-feature-name
```

### 10. 创建 Pull Request

在 GitHub 上创建 Pull Request，描述您的更改。

## 代码规范

### TypeScript/JavaScript

- 使用 TypeScript 编写代码
- 遵循 ESLint 配置
- 使用有意义的变量和函数名
- 添加适当的类型注解
- 避免使用 `any` 类型

```typescript
// ✅ 好的示例
interface RequestConfig {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
}

function sendRequest(config: RequestConfig): Promise<Response> {
  // 实现
}

// ❌ 避免
function doSomething(data: any) {
  // 实现
}
```

### React 组件

- 使用函数式组件和 Hooks
- 组件名使用 PascalCase
- Props 使用 interface 定义
- 提取复杂逻辑到自定义 Hooks

```typescript
// ✅ 好的示例
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### CSS/样式

- 使用有意义的类名
- 避免内联样式
- 使用 CSS 变量实现主题
- 保持样式模块化

### 文件组织

```
src/
├── main/           # Electron 主进程
├── preload/        # 预加载脚本
└── renderer/       # React 渲染进程
    ├── components/ # 可复用组件
    ├── hooks/      # 自定义 Hooks
    ├── types/      # TypeScript 类型
    ├── utils/      # 工具函数
    └── styles/     # 样式文件
```

## 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

### 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- `perf`: 性能优化
- `test`: 添加或修改测试
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI 配置文件和脚本的变动

### 示例

```bash
# 添加新功能
git commit -m "feat(request): 添加 GraphQL 请求支持"

# 修复 bug
git commit -m "fix(theme): 修复暗色主题下按钮颜色问题"

# 文档更新
git commit -m "docs(readme): 更新安装说明"

# 性能优化
git commit -m "perf(response): 优化大型 JSON 响应的渲染性能"
```

## 报告问题

### 在提交问题前

- 搜索现有 Issues，确保问题未被报告
- 确认使用的是最新版本
- 准备好重现步骤

### 创建 Issue

包含以下信息：

1. **问题描述** - 清晰简洁的描述
2. **重现步骤** - 详细的步骤说明
3. **期望行为** - 应该发生什么
4. **实际行为** - 实际发生了什么
5. **环境信息**：
   - Magpie 版本
   - 操作系统及版本
   - 相关截图或错误信息

### Issue 模板

```markdown
## 问题描述
简要描述遇到的问题

## 重现步骤
1. 打开应用
2. 点击...
3. 输入...
4. 看到错误

## 期望行为
应该显示...

## 实际行为
实际显示...

## 环境信息
- Magpie 版本: v1.0.0
- 操作系统: Windows 11
- 其他相关信息...

## 截图
如果有的话，添加截图
```

## 提出功能建议

### 创建功能建议

1. 检查是否已有相似建议
2. 清晰描述功能和用例
3. 说明为什么需要这个功能
4. 如果可能，提供设计方案或示例

### 功能建议模板

```markdown
## 功能描述
简要描述建议的功能

## 问题/需求
这个功能解决什么问题？

## 建议的解决方案
详细描述您希望如何实现

## 替代方案
是否考虑过其他方案？

## 补充信息
其他相关信息、截图、参考等
```

## Pull Request 流程

### PR 要求

- [ ] 代码遵循项目的代码规范
- [ ] 提交信息遵循规范
- [ ] 已测试更改，确保功能正常
- [ ] 已更新相关文档
- [ ] 没有引入新的警告或错误
- [ ] 如果是新功能，已添加相应测试

### PR 描述

```markdown
## 更改类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 重构
- [ ] 文档更新
- [ ] 其他（请说明）

## 更改说明
描述此 PR 的更改内容

## 相关 Issue
关闭 #123

## 测试
如何测试这些更改

## 截图（如果适用）
添加相关截图

## 检查清单
- [ ] 代码遵循规范
- [ ] 已自测
- [ ] 已更新文档
- [ ] 提交信息规范
```

### 代码审查

- 所有 PR 需要至少一次代码审查
- 积极响应审查意见
- 保持讨论专业和建设性

## 开发技巧

### 调试

**主进程调试**：
- 使用 VS Code 的 Electron 调试配置
- 在代码中添加 `console.log`

**渲染进程调试**：
- 按 `Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (macOS) 打开 DevTools
- 使用 React DevTools

### 热重载

开发模式下支持热重载，修改代码后自动刷新。

### 性能分析

使用 React DevTools Profiler 分析组件性能。

## 获取帮助

如有疑问：

- 📖 查看[文档](./magpiedocs/)
- 💬 在 [GitHub Discussions](https://github.com/yourusername/magpie/discussions) 提问
- 📧 发送邮件至 magpie@example.com

## 许可证

通过贡献，您同意您的贡献将在 [MIT License](LICENSE) 下许可。

---

**感谢您的贡献！** 🎉

每一个贡献，无论大小，都让 Magpie 变得更好！


