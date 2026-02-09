# 写作助手 - 公众号 Markdown 编辑器

一个基于 React 的专业微信公众号 Markdown 编辑器，集成 13 种精美主题样式，支持实时预览和一键复制。

## ✨ 功能特点

- **📝 Markdown 编辑** - 基于 @uiw/react-md-editor 的实时编辑器，支持语法高亮
- **🎨 13 种主题** - 集成 bm.md 的专业主题样式，涵盖简约、现代、创意、经典 4 大分类
- **⚡ 实时转换** - 输入即预览，无需手动操作
- **📋 一键复制** - 带格式 HTML 复制，直接粘贴到微信公众号编辑器
- **💾 导出功能** - 支持导出为 HTML 文件
- **🔧 动态加载** - 使用 Vite 动态导入主题，按需加载，性能优化

## 🎯 主题列表

| 分类 | 主题 | 特点 |
|------|------|------|
| **简约** | 淡雅、简约绿、专业 | 清新淡雅，适合内容为主的文章 |
| **现代** | 包豪斯、终端 | 几何现代主义，科技感十足 |
| **创意** | 手绘、新野兽派、几何、极繁 | 大胆创新，视觉冲击力强 |
| **经典** | 植物园、报纸、有机、复古 | 经典风格，适合传统内容 |

## 🛠 技术栈

- **React 18** + **TypeScript** + **Vite** - 现代化开发体验
- **Ant Design** - 企业级 UI 组件库
- **@uiw/react-md-editor** - 强大的 Markdown 编辑器
- **Unified** (remark + rehype) - Markdown 解析引擎
- **bm.md 主题** - 13 种专业主题样式

## 📦 安装与运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5174

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📖 使用说明

1. **编辑 Markdown** - 在左侧编辑器中输入 Markdown 内容
2. **选择主题** - 在右侧主题选择器中选择合适的主题风格
3. **实时预览** - 查看主题应用后的公众号预览效果
4. **复制内容** - 点击"复制"按钮复制带格式的内容
5. **粘贴到公众号** - 在微信公众号编辑器中使用 Ctrl+V / Cmd+V 粘贴

## 📁 项目结构

```
src/
├── components/
│   ├── Editor/
│   │   └── MarkdownEditor.tsx       # Markdown 编辑器组件
│   ├── Toolbar/
│   │   └── FormatToolbar.tsx        # 工具栏（复制、导出、清空）
│   ├── ThemeSwitcher/
│   │   └── ThemeSwitcher.tsx        # 主题切换器（按分类分组）
│   └── WeChatFormatter/
│       └── WeChatPreview.tsx        # 公众号格式预览
├── themes/                          # 主题 CSS 文件（13 个主题）
│   ├── ayu-light.css
│   ├── bauhaus.css
│   ├── botanical.css
│   └── ...
├── utils/
│   ├── themes.ts                    # 主题配置元数据
│   ├── themeLoader.ts               # 主题动态加载器
│   ├── markdownParser.ts            # Markdown → HTML 转换
│   └── clipboard.ts                 # 剪贴板操作
├── App.tsx                          # 主应用
└── main.tsx                         # 应用入口
```

## 🎨 主题系统

### 主题加载机制

使用 Vite 的动态 `import()` 功能，实现按需加载主题：

```typescript
// 动态加载主题 CSS
const module = await import(`../themes/${themeId}.css?inline`);
```

### 主题配置

每个主题包含元数据：

```typescript
interface Theme {
  id: string;          // 主题 ID，对应 CSS 文件名
  name: string;        // 中文名称
  nameEn: string;      // 英文名称
  description: string; // 主题描述
  category: 'minimal' | 'modern' | 'creative' | 'classic';
  previewColor: string; // 主题预览色
}
```

### 添加新主题

1. 在 `src/themes/` 目录下添加新的 CSS 文件
2. 使用 `#writing-assistant` 作为容器选择器
3. 在 `src/utils/themes.ts` 中添加主题元数据

## 🔗 设计参考

主题样式来自专业的 bm.md 项目：
- **GitHub**: https://github.com/miantiao-me/bm.md
- **官网**: https://bm.md

## 🌐 浏览器兼容性

- ✅ Chrome/Edge: 完全支持
- ✅ Firefox: 完全支持
- ✅ Safari: 完全支持
- ✅ 微信内置浏览器: 完全支持（复制后粘贴）

## 📝 待办事项

- [ ] 添加图片上传功能
- [ ] 支持自定义主题配置
- [ ] 添加更多预设主题
- [ ] 支持导出为 PDF
- [ ] 添加模板库

## 📄 许可证

MIT

---

**Made with ❤️ for WeChat Official Accounts**
