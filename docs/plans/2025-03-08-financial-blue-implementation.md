# 财经蓝主题实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为写作助手添加一款适合财经类文章的专业主题，采用深蓝+金色配色，支持亮色/暗黑模式自动切换。

**Architecture:**
1. 创建 `financial-blue.css` 主题文件，使用 CSS 变量定义两套配色
2. 使用 `@media (prefers-color-scheme: dark)` 实现暗黑模式自动切换
3. 在 `themes.ts` 中添加主题元数据，使其在主题选择器中可用

**Tech Stack:**
- CSS Variables（双主题配色管理）
- CSS Media Query（系统主题检测）
- TypeScript（主题元数据）
- Vite 动态导入（按需加载）

---

## Task 1: 创建财经蓝主题 CSS 文件

**Files:**
- Create: `src/themes/financial-blue.css`

**Step 1: 创建 CSS 文件基础结构和 CSS 变量**

创建 `src/themes/financial-blue.css`，添加以下内容：

```css
/* ============================================
   财经蓝 - 专业金融主题
   支持亮色/暗黑模式自动切换

   设计理念：
   - 深蓝传达专业可信赖
   - 金色点缀强调关键数据
   - 简约大气，适合长文阅读
   ============================================ */

/* CSS 变量 - 亮色模式（默认） */
#writing-assistant {
  /* 主色调 */
  --primary: #1e40af;
  --primary-light: #3b82f6;
  /* 强调色 - 金色 */
  --accent: #d4a855;
  --accent-light: #fbbf24;

  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f9fafb;
  --bg-code: #f3f4f6;
  --bg-quote: #eff6ff;

  /* 文字色 */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --text-code: #1e40af;

  /* 边框和线条 */
  --border: #e5e7eb;
  --border-light: #f3f4f6;
  --divider: #d4a855;

  /* 其他 */
  --link-hover: #b45309;
  --mark-bg: rgba(212, 168, 85, 0.2);
  --ins-bg: rgba(30, 64, 175, 0.1);

  /* 容器基础样式 */
  color: var(--text-primary);
  background-color: var(--bg-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  padding: 1.5em 1em;
}

/* 暗黑模式覆盖 */
@media (prefers-color-scheme: dark) {
  #writing-assistant {
    /* 主色调 - 亮蓝 */
    --primary: #60a5fa;
    --primary-light: #93c5fd;
    /* 强调色 - 金色（增强对比） */
    --accent: #fbbf24;
    --accent-light: #fcd34d;

    /* 背景色 - 深蓝黑系 */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --bg-code: #1e293b;
    --bg-quote: #1e3a5f;

    /* 文字色 - 浅色系 */
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-tertiary: #64748b;
    --text-code: #60a5fa;

    /* 边框和线条 */
    --border: #334155;
    --border-light: #1e293b;
    --divider: #fbbf24;

    /* 其他 */
    --link-hover: #fcd34d;
    --mark-bg: rgba(251, 191, 36, 0.2);
    --ins-bg: rgba(96, 165, 250, 0.15);
  }
}
```

**Step 2: 验证 CSS 文件创建成功**

Run: `ls -lh src/themes/financial-blue.css`
Expected: 显示文件大小约 2KB

**Step 3: 暂存文件**

Run: `git add src/themes/financial-blue.css`

---

## Task 2: 实现标题样式

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 在文件末尾添加标题样式**

```css
/* ============================================
   标题系统
   ============================================ */

#writing-assistant h1,
#writing-assistant h2,
#writing-assistant h3,
#writing-assistant h4,
#writing-assistant h5,
#writing-assistant h6 {
  line-height: 1.35;
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

#writing-assistant h4,
#writing-assistant h5,
#writing-assistant h6 {
  font-weight: 500;
}

/* H1 - 文章标题，居中金色下划线 */
#writing-assistant h1 {
  font-size: 1.75em;
  color: var(--text-primary);
  text-align: center;
  padding-bottom: 0.5em;
  border-bottom: 2px solid var(--accent);
}

/* H2 - 主要章节，左侧金色竖线 */
#writing-assistant h2 {
  font-size: 1.35em;
  color: var(--primary);
  padding: 2px 12px;
  border-left: 4px solid var(--accent);
  display: inline-block;
  margin: 0.3em 0;
}

#writing-assistant h2 a {
  color: var(--primary);
}

#writing-assistant h2 code {
  background-color: transparent;
  color: var(--primary);
}

/* H3 - 小节标题 */
#writing-assistant h3 {
  font-size: 1.2em;
  color: var(--primary);
}

/* H4-H6 - 次级标题 */
#writing-assistant h4,
#writing-assistant h5,
#writing-assistant h6 {
  font-size: 1em;
  color: var(--text-secondary);
}

/* 首个标题无上边距 */
#writing-assistant > h1:first-child,
#writing-assistant > h2:first-child,
#writing-assistant > h3:first-child,
#writing-assistant > h4:first-child,
#writing-assistant > h5:first-child,
#writing-assistant > h6:first-child {
  margin-top: 0;
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 3: 实现段落和文本样式

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加段落和文本样式**

```css
/* ============================================
   段落
   ============================================ */

#writing-assistant p {
  margin-bottom: 1em;
  line-height: 1.8;
}

#writing-assistant p:last-child {
  margin-bottom: 0;
}

/* ============================================
   行内文本样式
   ============================================ */

/* 加粗 - 金色强调 */
#writing-assistant strong,
#writing-assistant b {
  font-weight: 600;
  color: var(--accent);
}

#writing-assistant em,
#writing-assistant i {
  font-style: italic;
}

#writing-assistant del,
#writing-assistant s,
#writing-assistant strike {
  color: var(--text-secondary);
  text-decoration: line-through;
}

/* 高亮标记 - 金色半透明背景 */
#writing-assistant mark {
  background-color: var(--mark-bg);
  color: var(--text-primary);
  padding: 1px 4px;
  border-radius: 2px;
}

#writing-assistant small {
  font-size: 0.875em;
  color: var(--text-secondary);
}

#writing-assistant sup,
#writing-assistant sub {
  font-size: 0.75em;
  line-height: 0;
}

#writing-assistant sup {
  vertical-align: super;
}

#writing-assistant sub {
  vertical-align: sub;
}

#writing-assistant ins {
  background-color: var(--ins-bg);
  text-decoration: none;
  padding: 0.1em 0.2em;
  border-radius: 2px;
}

#writing-assistant q {
  quotes: '"' '"' '' ' ' '';
  color: var(--text-primary);
}

#writing-assistant q::before {
  content: open-quote;
  color: var(--accent);
}

#writing-assistant q::after {
  content: close-quote;
  color: var(--accent);
}

#writing-assistant var {
  font-style: italic;
  color: var(--primary);
}

#writing-assistant samp,
#writing-assistant tt {
  font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.85em;
  background-color: var(--bg-secondary);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

#writing-assistant abbr[title] {
  border-bottom: 1px dotted var(--text-secondary);
  cursor: help;
  text-decoration: none;
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 4: 实现链接样式

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加链接样式**

```css
/* ============================================
   链接 - 金色带下划线
   ============================================ */

#writing-assistant a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
}

#writing-assistant a:hover {
  color: var(--link-hover);
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 5: 实现引用块样式（重点）

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加引用块样式**

```css
/* ============================================
   引用块 - 金色左边框 + 蓝色背景
   ============================================ */

#writing-assistant blockquote {
  display: block;
  font-size: 0.95em;
  overflow: auto;
  border-left: 4px solid var(--accent);
  padding: 12px 20px;
  margin: 1em 0;
  background: var(--bg-quote);
}

#writing-assistant blockquote p {
  margin-bottom: 0.5em;
  line-height: 1.7;
}

#writing-assistant blockquote p:last-child {
  margin-bottom: 0;
}

/* 嵌套引用 - 蓝色边框 */
#writing-assistant blockquote blockquote {
  margin-top: 0.5em;
  margin-bottom: 0;
  border-left-color: var(--primary);
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 6: 实现代码块样式

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加代码样式**

```css
/* ============================================
   代码
   ============================================ */

#writing-assistant code {
  font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
  background-color: var(--bg-secondary);
  color: var(--text-code);
  padding: 2px 4px;
  border-radius: 3px;
  word-break: break-all;
}

#writing-assistant pre {
  margin: 1em 0;
  padding: 1.2em;
  background-color: var(--bg-code);
  border-radius: 10px;
  overflow-x: auto;
  line-height: 1.6;
}

#writing-assistant pre code {
  background-color: transparent;
  color: var(--text-primary);
  padding: 0;
  border: none;
  border-radius: 0;
  font-size: 0.875em;
  line-height: 1.5;
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 7: 实现表格样式

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加表格样式**

```css
/* ============================================
   表格
   ============================================ */

#writing-assistant table {
  display: table;
  width: 100%;
  margin: 1em 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.95em;
  text-align: left;
}

#writing-assistant th,
#writing-assistant td {
  padding: 8px 12px;
  border: 1px solid var(--border);
  text-align: left;
}

#writing-assistant th {
  font-weight: bold;
  color: var(--bg-primary);
  background-color: var(--primary);
  text-align: center;
  min-width: 6em;
}

#writing-assistant tbody tr:nth-child(even) {
  background-color: var(--bg-tertiary);
}

/* 前言表格 */
#writing-assistant .frontmatter-table {
  width: auto;
  margin-bottom: 1.5em;
  font-size: 0.875em;
  border: none;
}

#writing-assistant .frontmatter-table td {
  padding: 0.25em 0.75em 0.25em 0;
  border: none;
  vertical-align: top;
  background-color: transparent;
}

#writing-assistant .frontmatter-key {
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
}

#writing-assistant .frontmatter-key::after {
  content: ':';
}

#writing-assistant .frontmatter-value {
  color: var(--text-secondary);
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 8: 实现列表样式

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加列表样式**

```css
/* ============================================
   列表
   ============================================ */

#writing-assistant ul,
#writing-assistant ol {
  margin-bottom: 1em;
  padding-left: 2em;
}

#writing-assistant ul {
  list-style-type: disc;
}

#writing-assistant ol {
  list-style-type: decimal;
}

#writing-assistant li {
  margin-bottom: 0.4em;
  line-height: 1.7;
}

#writing-assistant li::marker {
  font-weight: bold;
  color: var(--accent);
}

#writing-assistant li > ul,
#writing-assistant li > ol {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}

#writing-assistant ul ul {
  list-style-type: circle;
}

#writing-assistant ul ul ul {
  list-style-type: square;
}

#writing-assistant ul.contains-task-list {
  list-style-type: none;
  padding-left: 0;
}

#writing-assistant li.task-list-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4em;
}

#writing-assistant input[type='checkbox'] {
  margin-top: 0.35em;
  accent-color: var(--accent);
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 9: 实现分割线和其他元素

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 添加分割线等样式**

```css
/* ============================================
   分割线 - 金色细线
   ============================================ */

#writing-assistant hr {
  margin: 1.5em 0;
  border: none;
  border-top: 1px solid var(--divider);
  border-radius: 2px;
}

/* ============================================
   图片与媒体
   ============================================ */

#writing-assistant img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1em auto;
}

#writing-assistant picture {
  display: block;
  margin: 1em 0;
}

#writing-assistant picture img {
  margin: 0;
}

#writing-assistant figure {
  margin: 1em 0;
  text-align: center;
}

#writing-assistant figure img {
  margin: 0 auto;
}

#writing-assistant figcaption {
  margin-top: 0.5em;
  font-size: 0.875em;
  color: var(--text-secondary);
}

/* ============================================
   Ruby 注音
   ============================================ */

#writing-assistant ruby {
  ruby-align: center;
}

#writing-assistant rt {
  font-size: 0.5em;
  color: var(--text-secondary);
}

#writing-assistant rp {
  color: var(--text-secondary);
}

/* ============================================
   脚注
   ============================================ */

#writing-assistant .footnotes {
  margin-top: 1.5em;
  padding-top: 0.75em;
  border-top: 1px solid var(--border);
  font-size: 0.875em;
  color: var(--text-secondary);
}

#writing-assistant .footnotes ol {
  padding-left: 1.25em;
}

#writing-assistant .footnote-ref {
  font-size: 0.75em;
  vertical-align: super;
  color: var(--accent);
}

#writing-assistant .footnote-backref,
#writing-assistant .data-footnote-backref {
  color: var(--accent);
  text-decoration: none;
}

/* ============================================
   定义列表
   ============================================ */

#writing-assistant dl {
  margin: 1em 0;
}

#writing-assistant dt {
  font-weight: 600;
  color: var(--accent);
  margin-top: 0.5em;
}

#writing-assistant dt:first-child {
  margin-top: 0;
}

#writing-assistant dd {
  margin-left: 1.25em;
  margin-top: 0.2em;
  color: var(--text-primary);
}

/* ============================================
   键盘按键
   ============================================ */

#writing-assistant kbd {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.8125em;
  display: inline-block;
  padding: 0.15em 0.4em;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 var(--border);
  color: var(--text-primary);
}

/* ============================================
   警告框
   ============================================ */

#writing-assistant .markdown-alert {
  display: block;
  overflow: auto;
  margin: 1em 0;
  padding: 12px 20px;
  border-radius: 4px;
  border-left: 3px solid;
  background: var(--bg-secondary);
}

#writing-assistant .markdown-alert-title {
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-weight: 600;
  font-size: 1.1em;
  margin-bottom: 0.3em;
}

#writing-assistant .markdown-alert-note {
  background-color: var(--bg-quote);
  border-left-color: var(--primary);
}

#writing-assistant .markdown-alert-note .markdown-alert-title {
  color: var(--primary);
}

#writing-assistant .markdown-alert-tip {
  background-color: var(--bg-quote);
  border-left-color: var(--accent);
}

#writing-assistant .markdown-alert-tip .markdown-alert-title {
  color: var(--accent);
}

#writing-assistant .markdown-alert-important {
  background-color: var(--bg-quote);
  border-left-color: var(--primary);
}

#writing-assistant .markdown-alert-important .markdown-alert-title {
  color: var(--primary);
}

#writing-assistant .markdown-alert-warning {
  background-color: var(--bg-quote);
  border-left-color: var(--accent);
}

#writing-assistant .markdown-alert-warning .markdown-alert-title {
  color: var(--accent);
}

#writing-assistant .markdown-alert-caution {
  background-color: var(--bg-quote);
  border-left-color: var(--accent);
}

#writing-assistant .markdown-alert-caution .markdown-alert-title {
  color: var(--accent);
}

/* ============================================
   数学公式
   ============================================ */

#writing-assistant .math-inline {
  font-size: 1em;
}

#writing-assistant .math-display {
  margin: 1em 0;
  overflow-x: auto;
  text-align: center;
}

/* ============================================
   折叠详情
   ============================================ */

#writing-assistant details {
  margin: 1em 0;
  padding: 0.5em 0.75em;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
}

#writing-assistant summary {
  font-weight: 600;
  cursor: pointer;
  color: var(--accent);
}

#writing-assistant details[open] summary {
  margin-bottom: 0.5em;
}

/* ============================================
   嵌入媒体
   ============================================ */

#writing-assistant iframe,
#writing-assistant video {
  display: block;
  max-width: 100%;
  margin: 1em 0;
  border-radius: 8px;
  border: 1px solid var(--border);
}

/* ============================================
   元信息与时间
   ============================================ */

#writing-assistant .meta,
#writing-assistant time {
  font-size: 0.875em;
  color: var(--text-secondary);
}

/* ============================================
   首行缩进变体
   ============================================ */

#writing-assistant.indent-first-line p {
  text-indent: 2em;
}
```

**Step 2: 暂存更改**

Run: `git add src/themes/financial-blue.css`

---

## Task 10: 注册主题到主题配置

**Files:**
- Modify: `src/utils/themes.ts`

**Step 1: 在 themes 数组中添加财经蓝主题**

在 `src/utils/themes.ts` 的 `themes` 数组中，添加财经蓝主题配置（建议放在 `professional` 主题之后）：

```typescript
{
  id: 'financial-blue',
  name: '财经蓝',
  nameEn: 'Financial Blue',
  description: '专业简约，深蓝+金色，支持暗黑模式',
  category: 'minimal',
  previewColor: '#1e40af',
},
```

**Step 2: 验证 TypeScript 编译**

Run: `npm run build`
Expected: 编译成功，无错误

**Step 3: 暂存更改**

Run: `git add src/utils/themes.ts`

---

## Task 11: 提交财经蓝主题

**Files:**
- Modified: `src/themes/financial-blue.css`
- Modified: `src/utils/themes.ts`

**Step 1: 提交所有更改**

```bash
git commit -m "$(cat <<'EOF'
feat: 添加财经蓝主题，支持暗黑模式

- 创建 financial-blue.css 主题文件
- 使用 CSS 变量管理亮色/暗黑模式配色
- 深蓝+金色配色，适合财经类文章
- 金色强调关键数据和引用块
- 自动适配系统主题设置

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

**Step 2: 验证提交**

Run: `git log --oneline -1`
Expected: 显示刚才的提交信息

---

## Task 12: 测试财经蓝主题

**Files:**
- Test: Manual testing in browser

**Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 服务器启动在 http://localhost:5174

**Step 2: 在浏览器中测试**

1. 打开 http://localhost:5174
2. 在主题选择器中找到"财经蓝"主题（简约分类下）
3. 选择该主题，预览效果
4. 在编辑器中输入测试内容：
   ```markdown
   # 财经文章测试

   ## 市场分析

   **关键数据**：2024年经济增长率预计达到5.2%。

   > 这是一个重要的市场观点，需要注意风险控制。

   - 数据项一
   - 数据项二
   - 数据项三

   [链接测试](https://example.com)
   ```

**Step 3: 验证亮色模式**

检查以下元素：
- [ ] H1 标题居中，底部金色边框
- [ ] H2 标题左侧金色竖线
- [ ] 加粗文本显示为金色
- [ ] 链接显示为金色带下划线
- [ ] 引用块有金色左边框和浅蓝背景
- [ ] 列表标记为金色
- [ ] 整体可读性良好

**Step 4: 验证暗黑模式**

1. 在系统设置中切换到暗黑模式
2. 刷新浏览器或观察预览区域自动切换
3. 检查以下元素：
   - [ ] 背景变为深蓝黑色
   - [ ] 文字变为浅色
   - [ ] 金色元素保持清晰可见
   - [ ] 对比度充足，可读性良好
   - [ ] 引用块背景变为深蓝色

**Step 5: 测试复制到公众号**

1. 点击"复制"按钮
2. 粘贴到微信公众号编辑器
3. 验证样式是否正确保留

---

## Task 13: 更新文档

**Files:**
- Modify: `README.md`

**Step 1: 更新 README.md 主题列表**

在主题列表中添加财经蓝主题：

在"## 🎯 主题列表"部分的"**简约**"分类中，添加：

```markdown
| **简约** | 淡雅、简约绿、专业、财经蓝 | 清新淡雅，适合内容为主的文章 |
```

或者修改为表格形式（如果还没有）：

| 分类 | 主题 | 特点 |
|------|------|------|
| **简约** | 淡雅、简约绿、专业、财经蓝 | 清新淡雅，适合内容为主的文章，财经蓝支持暗黑模式 |

**Step 2: 暂存并提交文档更新**

```bash
git add README.md
git commit -m "docs: 更新 README，添加财经蓝主题说明"
```

---

## Task 14: 最终验证和清理

**Files:**
- All files

**Step 1: 运行完整构建测试**

Run: `npm run build`
Expected: 构建成功，无错误

**Step 2: 检查文件大小**

Run: `ls -lh src/themes/financial-blue.css`
Expected: 文件大小合理（约 10-15KB）

**Step 3: 查看所有更改**

Run: `git status`
Expected: 只有预期的文件被修改

**Step 4: 查看提交历史**

Run: `git log --oneline -5`
Expected: 看到财经蓝主题相关的提交

**Step 5: 创建标签（可选）**

```bash
git tag -a v1.1.0 -m "添加财经蓝主题"
git push origin v1.1.0
```

---

## 验收标准

完成所有任务后，应该满足：

- [ ] 财经蓝主题在主题选择器中可见
- [ ] 亮色模式下所有元素样式正确
- [ ] 暗黑模式下所有元素样式正确
- [ ] 切换系统主题时自动更新
- [ ] 所有元素可读性良好
- [ ] 复制到公众号后样式正常
- [ ] 代码通过 TypeScript 编译
- [ ] 文档已更新
- [ ] 所有更改已提交到 git

---

## 参考文档

- 设计文档：`docs/plans/2025-03-08-financial-blue-theme-design.md`
- 项目说明：`CLAUDE.md`
- 主题参考：`src/themes/ayu-light.css`, `src/themes/professional.css`
