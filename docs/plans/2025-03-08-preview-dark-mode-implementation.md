# 预览区域暗黑模式实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为公众号预览区域添加暗黑模式支持，包括自动检测系统主题和手动切换功能。

**Architecture:**
1. 在 WeChatPreview 组件中添加 isDarkMode 状态管理
2. 使用 matchMedia API 监听系统主题变化
3. 添加 Switch 组件实现手动切换
4. 通过 data-theme 属性强制覆盖财经蓝主题的暗黑模式
5. 使用 sessionStorage 保存用户选择

**Tech Stack:**
- React Hooks (useState, useEffect)
- Web APIs (window.matchMedia, MediaQueryList)
- CSS Variables & Attribute Selectors
- Ant Design Switch Component
- sessionStorage API

---

## Task 1: 添加暗黑模式状态管理

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx:1-25`

**Step 1: 添加 useState 导入（如果还没有）**

检查文件顶部的导入语句：

```typescript
import React, { useEffect, useRef, useState } from 'react';
```

如果 `useState` 已经在导入列表中，跳过此步骤。

**Step 2: 在 WeChatPreview 组件中添加 isDarkMode 状态**

在组件的开头（`const previewRef` 之后）添加：

```typescript
const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
  // 初始化：从 sessionStorage 读取，或使用系统设置
  try {
    const stored = sessionStorage.getItem('preview-dark-mode-override');
    if (stored !== null) {
      return stored === 'true';
    }
  } catch (e) {
    // sessionStorage 访问失败，使用系统设置
  }

  // 使用系统设置
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // 默认亮色模式
  return false;
});
```

**Step 3: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 2: 添加系统主题监听

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx:26-40`

**Step 1: 添加 matchMedia 监听 useEffect**

在组件的 `useEffect` 调用之后添加（约第 40 行）：

```typescript
// 监听系统主题变化
useEffect(() => {
  // 检查浏览器支持
  if (typeof window === 'undefined' || !window.matchMedia) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Browser does not support color scheme detection');
    }
    return;
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e: MediaQueryListEvent) => {
    // 只在没有手动覆盖时跟随系统
    try {
      const hasOverride = sessionStorage.getItem('preview-dark-mode-override');
      if (!hasOverride) {
        setIsDarkMode(e.matches);
      }
    } catch (e) {
      // sessionStorage 访问失败，仍然跟随系统
      setIsDarkMode(e.matches);
    }
  };

  // 监听系统主题变化
  mediaQuery.addEventListener('change', handleChange);

  // 清理函数
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}, []);
```

**Step 2: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 3: 添加手动切换函数

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx`

**Step 1: 添加 handleDarkModeToggle 函数**

在 `useEffect` 调用之后添加：

```typescript
// 手动切换暗黑模式
const handleDarkModeToggle = (checked: boolean) => {
  setIsDarkMode(checked);

  try {
    sessionStorage.setItem('preview-dark-mode-override', checked.toString());
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to save dark mode preference:', e);
    }
  }
};
```

**Step 2: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 4: 添加 Switch 组件导入

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx:2`

**Step 1: 在 antd 导入中添加 Switch**

修改第 2 行的导入语句：

```typescript
import { Spin, Space, Typography, Card, message, Switch } from 'antd';
```

**Step 2: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 5: 在标题栏添加 Switch 组件

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx:73-82`

**Step 1: 在 Space 组件中添加 Switch**

找到 Card 组件中的 Space 组件（约第 73-82 行），修改为：

```tsx
<Space>
  <MobileOutlined style={{ color: theme.previewColor }} />
  <Text strong>
    公众号预览 - {theme.name}
  </Text>
  <Text type="secondary" style={{ fontSize: 12 }}>
    {theme.description}
  </Text>
  <Switch
    checked={isDarkMode}
    onChange={handleDarkModeToggle}
    checkedChildren="🌙"
    unCheckedChildren="☀️"
  />
</Space>
```

**Step 2: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 6: 更新预览容器背景色

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx:84-94`

**Step 1: 修改预览容器的 backgroundColor**

找到 `#writing-assistant` 的 div（约第 84-94 行），修改 backgroundColor：

```tsx
<div
  ref={previewRef}
  id="writing-assistant"
  style={{
    minHeight: '500px',
    padding: '20px',
    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }}
/>
```

**Step 2: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 7: 为财经蓝主题添加 data-theme 属性支持

**Files:**
- Modify: `src/themes/financial-blue.css`

**Step 1: 在文件末尾添加手动暗黑模式样式**

在 `@media (prefers-color-scheme: dark)` 规则之后（约第 114 行之后）添加：

```css
/* ============================================
   手动暗黑模式切换（优先级高于系统检测）
   ============================================ */

/* 强制暗黑模式 */
#writing-assistant[data-theme="dark"] {
  --primary: #60a5fa;
  --primary-light: #93c5fd;
  --accent: #fbbf24;
  --accent-light: #fcd34d;
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --bg-code: #1e293b;
  --bg-quote: #1e3a5f;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --text-code: #60a5fa;
  --border: #334155;
  --border-light: #1e293b;
  --divider: #fbbf24;
  --link-hover: #fcd34d;
  --mark-bg: rgba(251, 191, 36, 0.2);
  --ins-bg: rgba(96, 165, 250, 0.15);
}

/* 强制亮色模式（可选，用于覆盖系统暗黑模式） */
#writing-assistant[data-theme="light"] {
  /* 使用默认变量即可，无需重复定义 */
}
```

**重要：** 这些规则必须放在 `@media (prefers-color-scheme: dark)` 规则**之后**，这样才能覆盖媒体查询的样式。

**Step 2: 暂存文件**

Run: `git add src/themes/financial-blue.css`

---

## Task 8: 在预览容器添加 data-theme 属性

**Files:**
- Modify: `src/components/WeChatFormatter/WeChatPreview.tsx:84-94`

**Step 1: 添加 data-theme 属性**

修改 `#writing-assistant` 的 div：

```tsx
<div
  ref={previewRef}
  id="writing-assistant"
  data-theme={isDarkMode ? 'dark' : 'light'}
  style={{
    minHeight: '500px',
    padding: '20px',
    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }}
/>
```

**Step 2: 暂存文件**

Run: `git add src/components/WeChatFormatter/WeChatPreview.tsx`

---

## Task 9: 提交所有更改

**Files:**
- Modified: `src/components/WeChatFormatter/WeChatPreview.tsx`
- Modified: `src/themes/financial-blue.css`

**Step 1: 提交更改**

```bash
git add src/components/WeChatFormatter/WeChatPreview.tsx src/themes/financial-blue.css
git commit -m "$(cat <<'EOF'
feat: 添加预览区域暗黑模式支持

- 添加 isDarkMode 状态管理
- 监听系统主题变化（matchMedia）
- 添加 Switch 组件实现手动切换
- 通过 data-theme 属性强制覆盖财经蓝主题
- 使用 sessionStorage 保存用户选择

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

**Step 2: 验证提交**

Run: `git log --oneline -1`
Expected: 显示刚才的提交信息

---

## Task 10: 测试暗黑模式功能

**Files:**
- Test: Manual testing in browser

**Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 服务器启动在 http://localhost:5173 或 http://localhost:5174

**Step 2: 在浏览器中测试**

1. 打开浏览器访问开发服务器地址
2. 在编辑器中输入测试内容：
   ```markdown
   # 暗黑模式测试

   ## 标题测试

   **加粗文本**应该显示为金色。

   > 这是引用块，应该有金色边框和蓝色背景。

   - 列表项一
   - 列表项二
   ```

**Step 3: 测试默认状态**

- 检查预览区域的 Switch 初始状态是否与系统主题一致
- 如果系统是暗黑模式，Switch 应该是开启状态（🌙）
- 如果系统是亮色模式，Switch 应该是关闭状态（☀️）

**Step 4: 测试手动切换**

1. 点击 Switch 切换到暗黑模式
2. 观察预览区域背景色变化（白色 → 深蓝黑色 #0f172a）
3. 观察财经蓝主题的样式变化：
   - 背景变为深蓝黑色
   - 文字变为浅色
   - 加粗文本、链接、引用块边框保持金色
4. 再次点击 Switch 切换回亮色模式
5. 观察预览区域恢复亮色

**Step 5: 测试手动覆盖优先级**

1. 手动切换到暗黑模式
2. 在系统设置中切换到亮色模式
3. 观察预览区域**保持**暗黑模式（手动覆盖生效）
4. 刷新页面
5. 观察预览区域**恢复**到暗黑模式（sessionStorage 记住了选择）

**Step 6: 测试系统主题跟随（无手动覆盖时）**

1. 刷新页面，清除 sessionStorage（在开发者工具中执行：`sessionStorage.clear()`）
2. 再次刷新页面
3. 在系统设置中切换暗黑模式
4. 观察预览区域**自动**切换到暗黑模式
5. 在系统设置中切换回亮色模式
6. 观察预览区域**自动**切换回亮色模式

**Step 7: 测试其他主题**

1. 切换到非财经蓝主题（如"淡雅"、"专业"等）
2. 测试暗黑模式切换
3. 观察预览容器背景色变化（这些主题的内容样式不变，但容器背景色会变）

**Step 8: 测试边界情况**

1. 关闭浏览器，重新打开
2. 观察状态已重置（sessionStorage 特性）
3. 在无痕模式下测试（sessionStorage 仍然可用）
4. 测试 sessionStorage 失败情况（在开发者工具中禁用存储）

**Step 9: 停止开发服务器**

Run: `lsof -ti:5173 | xargs kill -9 2>/dev/null || lsof -ti:5174 | xargs kill -9 2>/dev/null || true`

---

## Task 11: 更新 README 文档

**Files:**
- Modify: `README.md`

**Step 1: 在 README.md 中添加暗黑模式说明**

找到功能特点部分（约第 6-13 行），在列表中添加：

```markdown
- **🌙 暗黑模式** - 预览区域支持自动检测系统主题和手动切换
```

或者在"核心功能"部分添加：

```markdown
### 核心功能
- **Markdown 编辑** - 基于 @uiw/react-md-editor 的实时编辑
- **自动转换** - 无需手动操作，实时转换为公众号格式
- **14 种主题** - 集成 bm.md 的专业主题样式，涵盖简约、现代、创意、经典 4 大分类
- **暗黑模式** - 预览区域支持自动检测系统主题和手动切换（财经蓝主题支持完整暗黑样式）
- **动态加载** - 使用 Vite 动态导入，按需加载主题
- **一键复制** - 带格式的 HTML 复制，可直接粘贴到公众号编辑器
- **导出功能** - 支持导出为 HTML 文件
```

**Step 2: 提交文档更新**

```bash
git add README.md
git commit -m "docs: 更新 README，添加暗黑模式功能说明"
```

---

## Task 12: 最终验证

**Files:**
- All files

**Step 1: 运行完整构建测试**

Run: `npm run build`
Expected: 构建成功，无错误

**Step 2: 检查文件修改**

Run: `git diff HEAD~3 --stat`
Expected: 看到修改的文件：
- `src/components/WeChatFormatter/WeChatPreview.tsx`
- `src/themes/financial-blue.css`
- `README.md`

**Step 3: 查看提交历史**

Run: `git log --oneline -5`
Expected: 看到暗黑模式相关的提交

**Step 4: 验证验收标准**

- [ ] 预览区域有 Switch 切换按钮
- [ ] 默认跟随系统主题设置
- [ ] 手动切换立即生效
- [ ] 手动切换优先级高于系统设置
- [ ] 状态保存在 sessionStorage
- [ ] 财经蓝主题在暗黑模式下样式正确
- [ ] 其他主题的预览容器背景色正确变化
- [ ] 刷新页面后手动选择被记住
- [ ] 关闭浏览器后状态重置
- [ ] 代码通过 TypeScript 编译
- [ ] 文档已更新

---

## 验收标准

完成所有任务后，应该满足：

- [ ] 预览区域标题栏有 Switch 组件（🌙/☀️ 图标）
- [ ] 默认状态跟随系统主题设置
- [ ] 手动切换预览区域立即更新（< 16ms）
- [ ] 手动覆盖后，系统切换不影响预览区域
- [ ] sessionStorage 正确保存和恢复用户选择
- [ ] 财经蓝主题支持手动暗黑模式（data-theme 属性生效）
- [ ] 其他 13 个主题的预览容器背景色正确变化
- [ ] 关闭浏览器后状态重置（sessionStorage 特性）
- [ ] 构建测试通过，无 TypeScript 错误
- [ ] README 文档已更新

---

## 参考文档

- 设计文档：`docs/plans/2025-03-08-preview-dark-mode-design.md`
- 项目说明：`CLAUDE.md`
- MDN - window.matchMedia: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
- Ant Design - Switch: https://ant.design/components/switch/
