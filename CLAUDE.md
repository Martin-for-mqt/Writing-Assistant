# 写作助手 - 公众号 Markdown 编辑器

## 项目概述

一个专业的微信公众号 Markdown 编辑器，支持实时转换为公众号兼容格式，提供多种蓝色系主题和深色模式支持。

### 核心功能
- **Markdown 编辑** - 基于 @uiw/react-md-editor 的实时编辑
- **自动转换** - 无需手动操作，实时转换为公众号格式
- **多主题支持** - 5 种蓝色系主题，每种主题都有独特的样式风格
- **深色模式** - 所有主题均支持深色模式
- **一键复制** - 带格式的 HTML 复制，可直接粘贴到公众号编辑器
- **导出功能** - 支持导出为 HTML 文件

## 技术栈

- **框架**: React 18 + TypeScript + Vite
- **UI 组件**: Ant Design
- **编辑器**: @uiw/react-md-editor
- **Markdown 解析**: unified + remark + rehype
- **样式**: Tailwind CSS
- **构建工具**: Vite

## 项目结构

```
src/
├── components/
│   ├── Editor/
│   │   └── MarkdownEditor.tsx    # Markdown 编辑器组件
│   ├── Toolbar/
│   │   └── FormatToolbar.tsx      # 顶部工具栏（复制、导出、清空）
│   ├── ThemeSwitcher/
│   │   └── ThemeSwitcher.tsx      # 主题切换器
│   └── WeChatFormatter/
│       └── WeChatPreview.tsx      # 公众号格式预览
├── utils/
│   ├── themes.ts                  # 主题配置（颜色 + 样式）
│   ├── markdownParser.ts          # Markdown → HTML 转换
│   ├── wechatFormatter.ts         # 公众号格式化（内联样式）
│   └── clipboard.ts               # 剪贴板操作
├── styles/
│   ├── global.css                 # 全局样式
│   ├── wechat.css                 # 公众号样式
│   └── index.css                  # 入口样式
├── App.tsx                        # 主应用
└── main.tsx                       # 应用入口
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

### 主题配置结构

每个主题包含 `colors`（颜色）和 `styles`（样式）两部分：

```typescript
interface Theme {
  id: string;
  name: string;
  description: string;
  style: 'minimal' | 'business' | 'tech' | 'elegant' | 'cartoon';
  colors: {
    primary: string;           // 主色调
    secondary: string;         // 次要色调
    accent: string;            // 强调色
    heading: string;           // 标题颜色
    text: string;              // 正文颜色
    textLight: string;         // 浅色文本
    background: string;        // 背景色
    border: string;            // 边框颜色
    codeBg: string;            // 代码背景
    codeText: string;          // 代码文本
    blockquoteBg: string;      // 引用背景
    blockquoteBorder: string;  // 引用边框
  };
  darkColors?: { /* 深色模式颜色 */ };
  styles: {
    // H1 样式
    h1Align: 'left' | 'center' | 'right';
    h1BgColor: string;         // 支持 gradient
    h1Border: string;
    h1Padding: string;

    // H2 样式
    h2Style: 'block' | 'border-left' | 'border-bottom' | 'bg-block';
    h2BgColor: string;
    h2Border: string;
    h2Align: 'left' | 'center';

    // H3 样式
    h3Style: 'simple' | 'dot' | 'number' | 'arrow';
    h3Prefix: string;          // 如 '▸ ' 或 '● '

    // 内容背景
    contentBg: 'transparent' | 'card' | 'stripe';
    contentPadding: string;

    // 强调文本样式
    strongStyle: 'color' | 'highlight' | 'underline' | 'marker';

    // 分隔线样式
    hrStyle: 'line' | 'dashed' | 'dot' | 'wave';

    // 引用块样式
    blockquoteStyle: 'simple' | 'card' | 'left-bar' | 'quote-icon';
  };
}
```

### 5 种主题风格

| 主题 ID | 名称 | 风格 | 特点 |
|---------|------|------|------|
| `classic` | 极简蓝 | minimal | 微信经典风格，居中标题，简洁专业 |
| `business` | 商务蓝 | business | 专业稳重，适合企业服务，卡片内容 |
| `tech` | 科技蓝 | tech | 现代科技感，渐变 H1，箭头前缀 |
| `elegant` | 雅致蓝 | elegant | 淡雅清新，左侧边框，下划线强调 |
| `vibrant` | 活力蓝 | cartoon | 活泼生动，背景标题，卡片引用 |

## 公众号格式化

### 内联样式策略

微信公众号不支持外部 CSS，所有样式都通过内联样式应用。`wechatFormatter.ts` 负责将主题配置转换为内联样式。

### 支持的 Markdown 元素

- **标题**: H1-H4，支持多种样式变体
- **段落**: 首行缩进，两端对齐
- **强调文本**: 4 种强调样式
- **代码**: 行内代码和代码块
- **引用**: 4 种引用样式
- **列表**: 有序和无序列表
- **链接**: 带下划线的链接样式
- **图片**: 响应式图片，居中显示
- **表格**: 带边框和隔行变色
- **分隔线**: 4 种分隔线样式

## 开发注意事项

### 类型导入

由于 `verbatimModuleSyntax` 配置，导入类型时必须使用 `import type`：

```typescript
import type { Theme } from './themes';
```

### 样式更新流程

1. 修改 `src/utils/themes.ts` 中的主题配置
2. `wechatFormatter.ts` 会自动应用新配置
3. 无需修改组件代码

### 添加新主题

在 `src/utils/themes.ts` 的 `themes` 数组中添加新主题对象：

```typescript
{
  id: 'custom-theme',
  name: '自定义主题',
  description: '主题描述',
  style: 'minimal',
  colors: { /* 颜色配置 */ },
  darkColors: { /* 深色模式颜色（可选）*/ },
  styles: { /* 样式配置 */ },
}
```

## 设计参考

主题样式参考了以下主流公众号排版平台：
- **135 编辑器**: https://www.135editor.com
- **365 编辑器**: https://www.365editor.com

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
