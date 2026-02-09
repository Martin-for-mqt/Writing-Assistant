# 写作助手 - 公众号 Markdown 编辑器

## 项目概述

一个专业的微信公众号 Markdown 编辑器，集成 bm.md 的 13 种专业主题样式，支持实时转换为公众号兼容格式。

### 核心功能
- **Markdown 编辑** - 基于 @uiw/react-md-editor 的实时编辑
- **自动转换** - 无需手动操作，实时转换为公众号格式
- **13 种主题** - 集成 bm.md 专业主题，涵盖简约、现代、创意、经典 4 大分类
- **动态加载** - 使用 Vite 动态导入，按需加载主题
- **一键复制** - 带格式的 HTML 复制，可直接粘贴到公众号编辑器
- **导出功能** - 支持导出为 HTML 文件

## 技术栈

- **框架**: React 18 + TypeScript + Vite
- **UI 组件**: Ant Design
- **编辑器**: @uiw/react-md-editor
- **Markdown 解析**: unified + remark + rehype
- **主题来源**: bm.md (https://github.com/miantiao-me/bm.md)
- **构建工具**: Vite

## 项目结构

```
src/
├── components/
│   ├── Editor/
│   │   └── MarkdownEditor.tsx       # Markdown 编辑器组件
│   ├── Toolbar/
│   │   └── FormatToolbar.tsx        # 顶部工具栏（复制、导出、清空）
│   ├── ThemeSwitcher/
│   │   └── ThemeSwitcher.tsx        # 主题切换器（按分类分组）
│   └── WeChatFormatter/
│       └── WeChatPreview.tsx        # 公众号格式预览
├── themes/                          # 主题 CSS 文件（13 个主题）
│   ├── ayu-light.css                # 淡雅主题
│   ├── bauhaus.css                  # 包豪斯主题
│   ├── botanical.css                # 植物园主题
│   ├── green-simple.css             # 简约绿主题
│   ├── sketch.css                   # 手绘主题
│   ├── newsprint.css                # 报纸主题
│   ├── terminal.css                 # 终端主题
│   ├── neo-brutalism.css            # 新野兽派主题
│   ├── playful-geometric.css        # 几何主题
│   ├── professional.css             # 专业主题
│   ├── organic.css                  # 有机主题
│   ├── maximalism.css               # 极繁主题
│   └── retro.css                    # 复古主题
├── utils/
│   ├── themes.ts                    # 主题配置元数据
│   ├── themeLoader.ts               # 主题动态加载器
│   ├── markdownParser.ts            # Markdown → HTML 转换
│   └── clipboard.ts                 # 剪贴板操作
├── App.tsx                          # 主应用
└── main.tsx                         # 应用入口
```

## 安装与运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5174

### 构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 主题系统

### 主题分类

| 分类 | 主题 ID | 名称 | 特点 |
|------|---------|------|------|
| **简约** | `ayu-light` | 淡雅 | 温暖橙色调，Lapis 设计风格 |
| **简约** | `green-simple` | 简约绿 | 清新绿色调 |
| **简约** | `professional` | 专业 | 专业商务风格 |
| **现代** | `bauhaus` | 包豪斯 | 几何现代主义，三原色构成 |
| **现代** | `terminal` | 终端 | 命令行风格，科技感 |
| **创意** | `sketch` | 手绘 | 手绘素描风格 |
| **创意** | `neo-brutalism` | 新野兽派 | 厚重边框，硬阴影 |
| **创意** | `playful-geometric` | 几何 | 活泼几何，多彩对比 |
| **创意** | `maximalism` | 极繁 | 极繁主义，丰富装饰 |
| **经典** | `botanical` | 植物园 | 自然柔和，植物灵感 |
| **经典** | `newsprint` | 报纸 | 报纸印刷风格 |
| **经典** | `organic` | 有机 | 有机自然风格 |
| **经典** | `retro` | 复古 | 复古怀旧风格 |

### 主题加载机制

使用 Vite 的动态 `import()` 功能实现按需加载：

```typescript
// themeLoader.ts
const module = await import(`../themes/${themeId}.css?inline`);
this.styleElement.textContent = module.default || module;
```

### 主题配置接口

```typescript
interface Theme {
  id: string;          // 主题 ID，对应 CSS 文件名
  name: string;        // 中文名称
  nameEn: string;      // 英文名称
  description: string; // 主题描述
  category: 'minimal' | 'modern' | 'creative' | 'classic';
  previewColor: string; // 主题预览色（用于主题选择器）
}
```

### 添加新主题

1. **创建 CSS 文件**
   在 `src/themes/` 目录下创建新的 CSS 文件
   - 使用 `#writing-assistant` 作为根选择器
   - 参考现有主题的 CSS 结构

2. **添加主题元数据**
   在 `src/utils/themes.ts` 的 `themes` 数组中添加：

```typescript
{
  id: 'your-theme',
  name: '主题名称',
  nameEn: 'Theme Name',
  description: '主题描述',
  category: 'minimal', // 或 'modern', 'creative', 'classic'
  previewColor: '#hexcolor',
}
```

3. **自动可用**
   主题选择器会自动显示新主题，按分类分组

## CSS 选择器规范

所有主题 CSS 必须使用 `#writing-assistant` 作为根选择器：

```css
/* 容器 */
#writing-assistant {
  color: #5c6166;
  background-color: #fcfcfc;
  /* ... */
}

/* 标题 */
#writing-assistant h1 {
  /* ... */
}

/* 段落 */
#writing-assistant p {
  /* ... */
}
```

## 开发注意事项

### 类型导入

由于 `verbatimModuleSyntax` 配置，导入类型时必须使用 `import type`：

```typescript
import type { Theme } from './themes';
```

### Vite 动态导入

主题 CSS 使用 Vite 的 `?inline` 查询参数，确保获取原始 CSS 字符串：

```typescript
const module = await import(`../themes/${themeId}.css?inline`);
```

类型声明在 `src/vite-env.d.ts` 中：

```typescript
declare module '*.css?inline' {
  const content: string;
  export default content;
}
```

### HMR（热模块替换）

Vite 支持 CSS 的 HMR，修改主题 CSS 文件后自动更新，无需刷新页面。

## 设计参考

主题样式来自 bm.md 项目：
- **GitHub**: https://github.com/miantiao-me/bm.md
- **官网**: https://bm.md
- **主题目录**: `src/themes/markdown-style`

感谢 bm.md 项目提供的精美主题样式！

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- 微信内置浏览器: 完全支持（复制后粘贴）

## 未来优化

- [ ] 添加图片上传功能
- [ ] 支持自定义主题配置
- [ ] 添加更多预设主题
- [ ] 支持导出为 PDF
- [ ] 添加模板库
