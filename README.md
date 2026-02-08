# 写作助手 - 公众号 Markdown 编辑器

一个基于 React 的 Web 应用，提供 Markdown 编辑和微信公众号排版功能。

## 功能特点

- **Markdown 编辑器** - 支持语法高亮和实时预览
- **一键转换** - 将 Markdown 转换为微信公众号格式
- **样式美化** - 支持自定义字体、颜色、间距等样式
- **一键复制** - 复制带格式的内容到公众号编辑器
- **实时预览** - 同时查看 Markdown 预览和公众号预览

## 技术栈

- **React 18** + **Vite** + **TypeScript** - 快速开发体验
- **Ant Design** - UI 组件库
- **@uiw/react-md-editor** - Markdown 编辑器
- **Tailwind CSS** - 样式框架
- **Unified** (remark + rehype) - Markdown 解析

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. 在左侧编辑器中输入 Markdown 内容
2. 查看中间的 Markdown 预览
3. 点击"转换为公众号格式"按钮
4. 在右侧预览公众号格式效果
5. 可调整样式配置（字号、颜色等）
6. 点击"复制"按钮复制内容
7. 在微信公众号编辑器中粘贴（使用 Ctrl+V 或 Cmd+V）

## 项目结构

```
src/
├── components/
│   ├── Editor/         # Markdown 编辑器组件
│   ├── Toolbar/        # 工具栏组件
│   └── WeChatFormatter/ # 公众号预览组件
├── utils/
│   ├── markdownParser.ts    # Markdown 解析工具
│   ├── wechatFormatter.ts   # 公众号格式转换
│   └── clipboard.ts         # 复制功能
├── styles/
│   ├── wechat.css      # 公众号样式
│   └── global.css      # 全局样式
└── App.tsx             # 主应用组件
```

## 开发

本项目使用 Vite 进行构建，支持热模块替换（HMR）。修改代码后，浏览器会自动更新。

## 许可证

MIT
