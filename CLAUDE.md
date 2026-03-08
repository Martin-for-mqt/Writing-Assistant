# 写作助手 - 公众号 Markdown 编辑器

## 项目概述

一个专业的微信公众号 Markdown 编辑器，采用财经蓝主题，支持暗黑模式，实时转换为公众号兼容格式。

### 核心功能
- **Markdown 编辑** - 基于 @uiw/react-md-editor 的实时编辑
- **自动转换** - 无需手动操作，实时转换为公众号格式
- **财经蓝主题** - 专业简约，深蓝+金色配色，支持暗黑模式自动切换
- **一键复制** - 带格式的 HTML 复制，可直接粘贴到公众号编辑器
- **导出功能** - 支持导出为 HTML 文件

## 技术栈

- **框架**: React 18 + TypeScript + Vite
- **UI 组件**: Ant Design
- **编辑器**: @uiw/react-md-editor
- **Markdown 解析**: unified + remark + rehype
- **主题来源**: 财经蓝主题（基于 bm.md 设计）
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

### 财经蓝主题

- **主题 ID**: `financial-blue`
- **中文名称**: 财经蓝
- **英文名称**: Financial Blue
- **特点**: 专业简约，深蓝+金色配色，适合财经、商业、科技类内容
- **暗黑模式**: 完整支持，自动检测系统主题
- **CSS 文件**: `src/themes/financial-blue.css`

### 主题配置接口

```typescript
interface Theme {
  id: string;                // 主题 ID
  name: string;              // 中文名称
  nameEn: string;            // 英文名称
  description: string;       // 主题描述
  supportsDarkMode: boolean; // 是否支持暗黑模式
}
```

### 主题样式

财经蓝主题使用内联 CSS 样式函数，在 `src/utils/themes.ts` 中定义：

```typescript
export const getFinancialBlueTheme = (isDarkMode: boolean): string => {
  // 返回完整的 CSS 样式字符串
};
```

样式特点：
- 使用 `#writing-assistant` 作为根选择器
- 支持浅色和暗色两种模式
- 深蓝色 (#1a3a52) + 金色 (#c9a961) 配色
- 优化的字体、行距和排版

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

财经蓝主题设计灵感来自 bm.md 项目的专业主题风格：
- **GitHub**: https://github.com/miantiao-me/bm.md
- **官网**: https://bm.md

感谢 bm.md 项目提供的设计灵感！

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- 微信内置浏览器: 完全支持（复制后粘贴）

## 未来优化

- [ ] 添加图片上传功能
- [ ] 优化财经蓝主题的暗黑模式体验
- [ ] 支持导出为 PDF
- [ ] 添加模板库
