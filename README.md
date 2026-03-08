# 写作助手 - 公众号 Markdown 编辑器

一个基于 React 的专业微信公众号 Markdown 编辑器，集成财经蓝主题，支持暗黑模式，实时预览和一键复制。

## ✨ 功能特点

- **📝 Markdown 编辑** - 基于 @uiw/react-md-editor 的实时编辑器，支持语法高亮
- **🎨 财经蓝主题** - 专业简约，深蓝+金色配色，支持暗黑模式自动切换
- **🌙 暗黑模式** - 预览区域支持自动检测系统主题和手动切换，财经蓝主题支持完整暗黑样式
- **⚡ 实时转换** - 输入即预览，无需手动操作
- **📋 一键复制** - 带格式 HTML 复制，直接粘贴到微信公众号编辑器
- **💾 导出功能** - 支持导出为 HTML 文件

## 🎯 主题

### 财经蓝

- **特点**: 专业简约，深蓝+金色配色
- **适用场景**: 财经、商业、科技类专业内容
- **暗黑模式**: 支持自动检测系统主题和手动切换
- **设计理念**: 沉稳大气，突出专业性

## 🛠 技术栈

- **React 18** + **TypeScript** + **Vite** - 现代化开发体验
- **Ant Design** - 企业级 UI 组件库
- **@uiw/react-md-editor** - 强大的 Markdown 编辑器
- **Unified** (remark + rehype) - Markdown 解析引擎

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
2. **切换暗黑模式** - 点击右侧的暗黑模式切换按钮
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
├── themes/                          # 主题 CSS 文件
│   └── financial-blue.css           # 财经蓝主题（支持暗黑模式）
├── utils/
│   ├── themes.ts                    # 主题配置元数据
│   ├── themeLoader.ts               # 主题动态加载器
│   ├── markdownParser.ts            # Markdown → HTML 转换
│   └── clipboard.ts                 # 剪贴板操作
├── App.tsx                          # 主应用
└── main.tsx                         # 应用入口
```

## 🎨 主题系统

### 财经蓝主题

财经蓝主题专为财经、商业、科技类内容设计，具有以下特点：

- **专业配色**: 深蓝色主色调 + 金色点缀
- **暗黑模式**: 完整支持，自动检测系统主题
- **清晰层次**: 优秀的排版和视觉层次
- **高可读性**: 优化的字体、行距和配色

### 主题配置

主题配置位于 `src/utils/themes.ts`：

```typescript
interface Theme {
  id: string;          // 主题 ID
  name: string;        // 中文名称
  nameEn: string;      // 英文名称
  description: string; // 主题描述
  supportsDarkMode: boolean; // 是否支持暗黑模式
}
```

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
