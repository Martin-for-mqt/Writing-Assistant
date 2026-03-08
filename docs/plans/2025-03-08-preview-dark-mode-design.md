# 预览区域暗黑模式设计与实现

**日期：** 2025-03-08
**功能：** 公众号预览区域暗黑模式检测与手动切换

## 概述

为公众号预览区域添加暗黑模式支持，包括自动检测系统主题设置和手动切换功能。该功能只影响预览区域，不影响编辑器等其他部分。手动切换优先级高于系统自动检测，状态保存在 sessionStorage 中。

## 设计目标

1. **自动检测系统主题** - 使用 `window.matchMedia('(prefers-color-scheme: dark)')` 监听系统主题变化
2. **手动切换开关** - 在预览卡片标题栏添加 Switch 按钮，让用户手动控制
3. **强制覆盖** - 对于财经蓝主题等支持自动暗黑模式的主题，手动开关能够强制覆盖
4. **状态持久化** - 使用 sessionStorage 保存用户选择，关闭浏览器后重置
5. **性能优化** - 使用 CSS 变量实现快速切换，无明显延迟

## 架构设计

### 核心组件

```
WeChatPreview 组件
├── 状态管理
│   └── isDarkMode: boolean (当前是否为暗黑模式)
├── useEffect - 系统主题监听
│   ├── matchMedia('(prefers-color-scheme: dark)')
│   └── 监听系统主题变化
├── 切换函数
│   ├── handleDarkModeToggle
│   └── 保存到 sessionStorage
└── UI 修改
    ├── Switch 组件
    └── data-theme 属性应用
```

### 数据流

```
系统主题变化
  → matchMedia 监听器
  → 检查是否有手动覆盖（sessionStorage）
  → 如果无覆盖：更新 isDarkMode 状态

用户点击切换
  → handleDarkModeToggle(checked)
  → 更新 isDarkMode 状态
  → 保存到 sessionStorage

isDarkMode 变化
  → 更新预览容器样式
  → 设置 data-theme 属性
  → CSS 变量自动应用
```

## 组件设计

### WeChatPreview 组件修改

**1. 新增状态管理**

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

**2. 系统主题监听（useEffect）**

```typescript
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

**3. 切换函数**

```typescript
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

**4. UI 修改 - 标题栏添加开关**

```tsx
import { Switch } from 'antd';

<Card size="small" style={{ ... }}>
  <Space>
    <MobileOutlined style={{ color: theme.previewColor }} />
    <Text strong>公众号预览 - {theme.name}</Text>
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
</Card>
```

**5. 预览容器应用暗黑模式**

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

## CSS 修改

### 财经蓝主题支持强制覆盖

**文件：** `src/themes/financial-blue.css`

**问题：** 财经蓝主题使用 `@media (prefers-color-scheme: dark)` 自动切换，但手动开关需要强制覆盖。

**解决方案：** 在暗黑模式 media query 之后添加基于 `data-theme` 属性的样式。

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

**CSS 优先级说明：**
- `data-theme` 选择器与 `@media` 选择器优先级相同
- 后定义的规则会覆盖前面的
- 因此 `data-theme` 规则必须放在 `@media` 规则**之后**

**其他 13 个主题：**
- 不需要修改（它们不支持自动暗黑模式）
- 预览容器的 `backgroundColor` 会根据 `isDarkMode` 状态变化

## 错误处理与边界情况

### 1. sessionStorage 访问失败

**场景：** 用户在无痕模式或禁用了存储

**处理：** 使用 try-catch，失败时仅使用系统设置

```typescript
const getStoredDarkMode = (): boolean | null => {
  try {
    const stored = sessionStorage.getItem('preview-dark-mode-override');
    return stored ? stored === 'true' : null;
  } catch {
    return null;
  }
};
```

### 2. matchMedia 不支持

**场景：** 浏览器不支持 matchMedia API

**处理：** 默认使用亮色模式，开发环境显示警告

```typescript
const supportsColorScheme = typeof window !== 'undefined' &&
  window.matchMedia !== undefined;

if (!supportsColorScheme) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Browser does not support color scheme detection');
  }
  setIsDarkMode(false);
}
```

### 3. 组件卸载时清理监听器

**场景：** 组件卸载但监听器未移除

**处理：** useEffect 返回清理函数

```typescript
useEffect(() => {
  // ... 监听器逻辑
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}, []);
```

### 4. 主题切换时的闪烁

**场景：** 切换时预览区域短暂空白

**处理：** 不需要特殊处理，CSS 变量切换是原子的

## 性能优化

### 1. 使用 CSS 变量

- 切换时只需修改属性值，无需重新加载 CSS
- 浏览器原生支持，性能最优
- 切换延迟 < 16ms（一帧）

### 2. 避免频繁的状态更新

- matchMedia 监听器只在系统主题实际变化时触发
- 手动切换是用户主动触发，频率低
- 使用防抖或节流：不需要（事件频率已经很低）

### 3. sessionStorage 读写

- 同步操作，延迟极低（< 1ms）
- 仅在切换时读写，不影响性能

### 4. 不影响编辑器性能

- 预览区域和编辑器是独立的组件
- 暗黑模式切换只影响预览区域
- 不会导致编辑器输入延迟

## 可访问性（A11Y）

### 1. Switch 组件

- 使用 Ant Design 的 Switch，已内置可访问性支持
- 包含 `aria-checked` 属性
- 支持键盘导航（Tab 键聚焦，Space/Enter 切换）

### 2. 视觉反馈

- 使用 🌙 和 ☀️ 图标，清晰表达状态
- 颜色对比度符合 WCAG AA 标准（财经蓝主题已验证）
- 切换效果立即可见，无需额外提示

### 3. 主题切换通知

- 不需要 alert（切换效果立即可见）
- 预览区域实时更新，用户立即看到结果
- 符合"无障碍的即时反馈"原则

## 测试验证

### 手动测试清单

- ✅ 默认状态（首次加载）跟随系统主题
- ✅ 手动切换到暗黑模式，预览区域立即更新
- ✅ 手动切换到亮色模式，预览区域立即更新
- ✅ 切换系统暗黑模式设置，预览区域自动跟随（无手动覆盖时）
- ✅ 手动覆盖后，系统切换不影响预览区域
- ✅ 刷新页面后，手动选择被记住（从 sessionStorage 恢复）
- ✅ 财经蓝主题在手动暗黑模式下正确显示
- ✅ 其他 13 个主题的预览容器背景色正确变化
- ✅ sessionStorage 失败时，功能正常降级到系统检测
- ✅ 关闭浏览器后重新打开，状态已重置（sessionStorage 特性）

### 浏览器兼容性测试

- Chrome/Edge（最新版）- 完全支持
- Safari（最新版）- 完全支持
- Firefox（最新版）- 完全支持

### 性能验证

- 切换时无明显延迟（CSS 变量切换应该 < 16ms）
- 不影响编辑器输入性能
- 内存占用无显著增加

## 未来扩展（可选）

### 1. 导出时包含暗黑模式样式

**当前：** 只导出 HTML，暗黑模式依赖系统设置

**未来：** 提供"导出暗黑版 HTML"选项

**实现：**
- 在 FormatToolbar 添加"导出暗黑版"按钮
- 导出时强制包含暗黑模式的 CSS 变量
- 或者在 HTML 中添加 `data-theme="dark"` 属性

### 2. 更多预设主题支持暗黑模式

参考财经蓝主题的实现，逐步为其他 13 个主题添加暗黑模式支持：

**优先级建议：**
1. **简约分类** - 专业（Professional）
2. **现代分类** - 终端（Terminal）
3. **经典分类** - 报纸（Newsprint）

**实现方式：**
- 添加 CSS 变量系统
- 使用 `@media (prefers-color-scheme: dark)`
- 添加 `data-theme` 属性支持
- 验证对比度和可读性

### 3. 主题切换动画

**实现：** 使用 CSS transition 实现平滑过渡

```css
#writing-assistant {
  transition: background-color 0.3s, color 0.3s;
}

#writing-assistant * {
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
```

**注意：**
- 可能影响性能（需要测试）
- 可以设置为可选功能（用户可关闭）
- 某些元素不适合过渡（如边框、阴影）

### 4. 主题预览图

**当前：** 只有文字描述和预览色块

**未来：** 在主题选择器中显示实际效果预览

**实现：**
- 生成每个主题的截图（亮色和暗黑）
- 在主题选择器中显示缩略图
- 悬停时放大预览

## 实现文件清单

### 需要修改的文件

1. **`src/components/WeChatFormatter/WeChatPreview.tsx`**
   - 添加状态管理
   - 添加系统主题监听
   - 添加切换函数
   - 修改 UI（添加 Switch 组件）
   - 修改预览容器（添加 data-theme 属性）

2. **`src/themes/financial-blue.css`**
   - 在文件末尾添加 `data-theme` 样式规则
   - 必须放在 `@media` 规则之后

### 不需要修改的文件

- 编辑器组件（不受影响）
- 其他 13 个主题 CSS 文件（不支持暗黑模式，但预览容器背景色会变化）
- 主题配置文件（不需要修改）

## 技术栈

- **React Hooks:** useState, useEffect
- **Web APIs:** window.matchMedia, MediaQueryList
- **Storage API:** sessionStorage
- **CSS:** CSS Variables (CSS Custom Properties), Attribute Selectors
- **Ant Design:** Switch 组件

## 参考资料

- [MDN - window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [MDN - MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
- [MDN - CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Ant Design - Switch Component](https://ant.design/components/switch/)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
