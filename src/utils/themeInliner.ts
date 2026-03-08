/**
 * 内联财经蓝主题样式到 HTML
 *
 * 将财经蓝主题的 CSS 样式直接写入 HTML 元素的 style 属性中，
 * 以便复制到微信公众号编辑器时保持样式。
 */

// 亮色模式的样式映射
const financialBlueLightStyles: Record<string, Record<string, string>> = {
  // 容器基础样式
  '#writing-assistant': {
    'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    'font-size': '16px',
    'line-height': '1.7',
    'padding': '1.5em 1em',
    'color': '#1f2937',
    'background-color': '#ffffff',
  },

  // 标题样式
  'h1': {
    'font-size': '1.75em',
    'font-weight': '600',
    'text-align': 'center',
    'color': '#1f2937',
    'padding-bottom': '0.5em',
    'border-bottom': '2px solid #d4a855',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h2': {
    'font-size': '1.35em',
    'font-weight': '600',
    'color': '#1e40af',
    'padding': '2px 12px',
    'border-left': '4px solid #d4a855',
    'margin': '0.3em 0',
    'line-height': '1.35',
  },
  'h3': {
    'font-size': '1.2em',
    'font-weight': '600',
    'color': '#1e40af',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h4': {
    'font-size': '1em',
    'font-weight': '500',
    'color': '#6b7280',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h5': {
    'font-size': '1em',
    'font-weight': '500',
    'color': '#6b7280',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h6': {
    'font-size': '1em',
    'font-weight': '500',
    'color': '#6b7280',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },

  // 段落
  'p': {
    'margin-bottom': '1em',
    'line-height': '1.8',
    'color': '#1f2937',
  },

  // 行内文本样式
  'strong': {
    'font-weight': '600',
    'color': '#d4a855',
  },
  'b': {
    'font-weight': '600',
    'color': '#d4a855',
  },
  'em': {
    'font-style': 'italic',
  },
  'i': {
    'font-style': 'italic',
  },
  'del': {
    'color': '#6b7280',
    'text-decoration': 'line-through',
  },
  's': {
    'color': '#6b7280',
    'text-decoration': 'line-through',
  },
  'strike': {
    'color': '#6b7280',
    'text-decoration': 'line-through',
  },
  'mark': {
    'background-color': 'rgba(212, 168, 85, 0.2)',
    'color': '#1f2937',
    'padding': '1px 4px',
    'border-radius': '2px',
  },
  'small': {
    'font-size': '0.875em',
    'color': '#6b7280',
  },
  'sup': {
    'font-size': '0.75em',
    'vertical-align': 'super',
    'line-height': '0',
  },
  'sub': {
    'font-size': '0.75em',
    'vertical-align': 'sub',
    'line-height': '0',
  },
  'ins': {
    'background-color': 'rgba(30, 64, 175, 0.1)',
    'text-decoration': 'none',
    'padding': '0.1em 0.2em',
    'border-radius': '2px',
  },
  'var': {
    'font-style': 'italic',
    'color': '#1e40af',
  },

  // 链接
  'a': {
    'color': '#d4a855',
    'text-decoration': 'underline',
    'text-underline-offset': '4px',
    'text-decoration-thickness': '1px',
  },

  // 引用块
  'blockquote': {
    'display': 'block',
    'font-size': '0.95em',
    'overflow': 'auto',
    'border-left': '4px solid #d4a855',
    'padding': '12px 20px',
    'margin': '1em 0',
    'background': '#eff6ff',
    'line-height': '1.7',
  },

  // 代码
  'code': {
    'font-family': "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    'font-size': '0.9em',
    'background-color': '#f8f9fa',
    'color': '#1e40af',
    'padding': '2px 4px',
    'border-radius': '3px',
    'word-break': 'break-all',
  },
  'pre': {
    'margin': '1em 0',
    'padding': '1.2em',
    'background-color': '#f3f4f6',
    'border-radius': '10px',
    'overflow-x': 'auto',
    'line-height': '1.6',
  },
  'samp': {
    'font-family': "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    'font-size': '0.85em',
    'background-color': '#f8f9fa',
    'padding': '0.1em 0.3em',
    'border-radius': '3px',
  },
  'tt': {
    'font-family': "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    'font-size': '0.85em',
    'background-color': '#f8f9fa',
    'padding': '0.1em 0.3em',
    'border-radius': '3px',
  },
  'kbd': {
    'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    'font-size': '0.8125em',
    'display': 'inline-block',
    'padding': '0.15em 0.4em',
    'background-color': '#f8f9fa',
    'border': '1px solid #e5e7eb',
    'border-radius': '3px',
    'box-shadow': 'inset 0 -1px 0 #e5e7eb',
    'color': '#1f2937',
  },

  // 列表
  'ul': {
    'margin-bottom': '1em',
    'padding-left': '2em',
    'list-style-type': 'disc',
  },
  'ol': {
    'margin-bottom': '1em',
    'padding-left': '2em',
    'list-style-type': 'decimal',
  },
  'li': {
    'margin-bottom': '0.4em',
    'line-height': '1.7',
  },

  // 分割线
  'hr': {
    'margin': '1.5em 0',
    'border': 'none',
    'border-top': '1px solid #d4a855',
    'border-radius': '2px',
  },

  // 图片
  'img': {
    'display': 'block',
    'max-width': '100%',
    'height': 'auto',
    'margin': '1em auto',
  },

  // 表格
  'table': {
    'display': 'table',
    'width': '100%',
    'margin': '1em 0',
    'border-collapse': 'collapse',
    'border-spacing': '0',
    'font-size': '0.95em',
    'text-align': 'left',
  },
  'th': {
    'padding': '8px 12px',
    'border': '1px solid #e5e7eb',
    'font-weight': 'bold',
    'color': '#ffffff',
    'background-color': '#1e40af',
    'text-align': 'center',
    'min-width': '6em',
  },
  'td': {
    'padding': '8px 12px',
    'border': '1px solid #e5e7eb',
    'text-align': 'left',
  },

  // 定义列表
  'dl': {
    'margin': '1em 0',
  },
  'dt': {
    'font-weight': '600',
    'color': '#d4a855',
    'margin-top': '0.5em',
  },
  'dd': {
    'margin-left': '1.25em',
    'margin-top': '0.2em',
    'color': '#1f2937',
  },

  // 折叠详情
  'details': {
    'margin': '1em 0',
    'padding': '0.5em 0.75em',
    'background-color': '#f8f9fa',
    'border': '1px solid #e5e7eb',
    'border-radius': '8px',
  },
  'summary': {
    'font-weight': '600',
    'cursor': 'pointer',
    'color': '#d4a855',
  },

  // 警告框
  '.markdown-alert': {
    'display': 'block',
    'overflow': 'auto',
    'margin': '1em 0',
    'padding': '12px 20px',
    'border-radius': '4px',
    'border-left': '3px solid',
    'background': '#f8f9fa',
  },
  '.markdown-alert-note': {
    'background-color': '#eff6ff',
    'border-left-color': '#1e40af',
  },
  '.markdown-alert-tip': {
    'background-color': '#eff6ff',
    'border-left-color': '#d4a855',
  },
  '.markdown-alert-important': {
    'background-color': '#eff6ff',
    'border-left-color': '#1e40af',
  },
  '.markdown-alert-warning': {
    'background-color': '#eff6ff',
    'border-left-color': '#d4a855',
  },
  '.markdown-alert-caution': {
    'background-color': '#eff6ff',
    'border-left-color': '#d4a855',
  },
  '.markdown-alert-title': {
    'display': 'flex',
    'align-items': 'center',
    'gap': '0.4em',
    'font-weight': '600',
    'font-size': '1.1em',
    'margin-bottom': '0.3em',
  },
};

// 暗黑模式的样式映射
const financialBlueDarkStyles: Record<string, Record<string, string>> = {
  // 容器基础样式
  '#writing-assistant': {
    'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    'font-size': '16px',
    'line-height': '1.7',
    'padding': '1.5em 1em',
    'color': '#f1f5f9',
    'background-color': '#0f172a',
  },

  // 标题样式
  'h1': {
    'font-size': '1.75em',
    'font-weight': '600',
    'text-align': 'center',
    'color': '#f1f5f9',
    'padding-bottom': '0.5em',
    'border-bottom': '2px solid #fbbf24',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h2': {
    'font-size': '1.35em',
    'font-weight': '600',
    'color': '#60a5fa',
    'padding': '2px 12px',
    'border-left': '4px solid #fbbf24',
    'margin': '0.3em 0',
    'line-height': '1.35',
  },
  'h3': {
    'font-size': '1.2em',
    'font-weight': '600',
    'color': '#60a5fa',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h4': {
    'font-size': '1em',
    'font-weight': '500',
    'color': '#94a3b8',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h5': {
    'font-size': '1em',
    'font-weight': '500',
    'color': '#94a3b8',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },
  'h6': {
    'font-size': '1em',
    'font-weight': '500',
    'color': '#94a3b8',
    'line-height': '1.35',
    'margin-top': '1.2em',
    'margin-bottom': '0.5em',
  },

  // 段落
  'p': {
    'margin-bottom': '1em',
    'line-height': '1.8',
    'color': '#f1f5f9',
  },

  // 行内文本样式
  'strong': {
    'font-weight': '600',
    'color': '#fbbf24',
  },
  'b': {
    'font-weight': '600',
    'color': '#fbbf24',
  },
  'em': {
    'font-style': 'italic',
  },
  'i': {
    'font-style': 'italic',
  },
  'del': {
    'color': '#94a3b8',
    'text-decoration': 'line-through',
  },
  's': {
    'color': '#94a3b8',
    'text-decoration': 'line-through',
  },
  'strike': {
    'color': '#94a3b8',
    'text-decoration': 'line-through',
  },
  'mark': {
    'background-color': 'rgba(251, 191, 36, 0.2)',
    'color': '#f1f5f9',
    'padding': '1px 4px',
    'border-radius': '2px',
  },
  'small': {
    'font-size': '0.875em',
    'color': '#94a3b8',
  },
  'sup': {
    'font-size': '0.75em',
    'vertical-align': 'super',
    'line-height': '0',
  },
  'sub': {
    'font-size': '0.75em',
    'vertical-align': 'sub',
    'line-height': '0',
  },
  'ins': {
    'background-color': 'rgba(96, 165, 250, 0.15)',
    'text-decoration': 'none',
    'padding': '0.1em 0.2em',
    'border-radius': '2px',
  },
  'var': {
    'font-style': 'italic',
    'color': '#60a5fa',
  },

  // 链接
  'a': {
    'color': '#fbbf24',
    'text-decoration': 'underline',
    'text-underline-offset': '4px',
    'text-decoration-thickness': '1px',
  },

  // 引用块
  'blockquote': {
    'display': 'block',
    'font-size': '0.95em',
    'overflow': 'auto',
    'border-left': '4px solid #fbbf24',
    'padding': '12px 20px',
    'margin': '1em 0',
    'background': '#1e3a5f',
    'line-height': '1.7',
  },

  // 代码
  'code': {
    'font-family': "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    'font-size': '0.9em',
    'background-color': '#1e293b',
    'color': '#60a5fa',
    'padding': '2px 4px',
    'border-radius': '3px',
    'word-break': 'break-all',
  },
  'pre': {
    'margin': '1em 0',
    'padding': '1.2em',
    'background-color': '#1e293b',
    'border-radius': '10px',
    'overflow-x': 'auto',
    'line-height': '1.6',
  },
  'samp': {
    'font-family': "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    'font-size': '0.85em',
    'background-color': '#1e293b',
    'padding': '0.1em 0.3em',
    'border-radius': '3px',
  },
  'tt': {
    'font-family': "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    'font-size': '0.85em',
    'background-color': '#1e293b',
    'padding': '0.1em 0.3em',
    'border-radius': '3px',
  },
  'kbd': {
    'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    'font-size': '0.8125em',
    'display': 'inline-block',
    'padding': '0.15em 0.4em',
    'background-color': '#1e293b',
    'border': '1px solid #334155',
    'border-radius': '3px',
    'box-shadow': 'inset 0 -1px 0 #334155',
    'color': '#f1f5f9',
  },

  // 列表
  'ul': {
    'margin-bottom': '1em',
    'padding-left': '2em',
    'list-style-type': 'disc',
  },
  'ol': {
    'margin-bottom': '1em',
    'padding-left': '2em',
    'list-style-type': 'decimal',
  },
  'li': {
    'margin-bottom': '0.4em',
    'line-height': '1.7',
  },

  // 分割线
  'hr': {
    'margin': '1.5em 0',
    'border': 'none',
    'border-top': '1px solid #fbbf24',
    'border-radius': '2px',
  },

  // 图片
  'img': {
    'display': 'block',
    'max-width': '100%',
    'height': 'auto',
    'margin': '1em auto',
  },

  // 表格
  'table': {
    'display': 'table',
    'width': '100%',
    'margin': '1em 0',
    'border-collapse': 'collapse',
    'border-spacing': '0',
    'font-size': '0.95em',
    'text-align': 'left',
  },
  'th': {
    'padding': '8px 12px',
    'border': '1px solid #334155',
    'font-weight': 'bold',
    'color': '#0f172a',
    'background-color': '#60a5fa',
    'text-align': 'center',
    'min-width': '6em',
  },
  'td': {
    'padding': '8px 12px',
    'border': '1px solid #334155',
    'text-align': 'left',
  },

  // 定义列表
  'dl': {
    'margin': '1em 0',
  },
  'dt': {
    'font-weight': '600',
    'color': '#fbbf24',
    'margin-top': '0.5em',
  },
  'dd': {
    'margin-left': '1.25em',
    'margin-top': '0.2em',
    'color': '#f1f5f9',
  },

  // 折叠详情
  'details': {
    'margin': '1em 0',
    'padding': '0.5em 0.75em',
    'background-color': '#1e293b',
    'border': '1px solid #334155',
    'border-radius': '8px',
  },
  'summary': {
    'font-weight': '600',
    'cursor': 'pointer',
    'color': '#fbbf24',
  },

  // 警告框
  '.markdown-alert': {
    'display': 'block',
    'overflow': 'auto',
    'margin': '1em 0',
    'padding': '12px 20px',
    'border-radius': '4px',
    'border-left': '3px solid',
    'background': '#1e293b',
  },
  '.markdown-alert-note': {
    'background-color': '#1e3a5f',
    'border-left-color': '#60a5fa',
  },
  '.markdown-alert-tip': {
    'background-color': '#1e3a5f',
    'border-left-color': '#fbbf24',
  },
  '.markdown-alert-important': {
    'background-color': '#1e3a5f',
    'border-left-color': '#60a5fa',
  },
  '.markdown-alert-warning': {
    'background-color': '#1e3a5f',
    'border-left-color': '#fbbf24',
  },
  '.markdown-alert-caution': {
    'background-color': '#1e3a5f',
    'border-left-color': '#fbbf24',
  },
  '.markdown-alert-title': {
    'display': 'flex',
    'align-items': 'center',
    'gap': '0.4em',
    'font-weight': '600',
    'font-size': '1.1em',
    'margin-bottom': '0.3em',
  },
};

/**
 * 将样式对象转换为 style 字符串
 */
function stylesToString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(' ');
}

/**
 * 内联财经蓝主题样式到 HTML
 *
 * @param html - 要处理的 HTML 字符串
 * @param isDarkMode - 是否使用暗黑模式（默认 false）
 * @returns 带有内联样式的 HTML 字符串
 */
export function inlineFinancialBlueTheme(html: string, isDarkMode = false): string {
  // 创建临时 DOM 解析 HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // 获取样式映射（亮色或暗黑）
  const styles = isDarkMode ? financialBlueDarkStyles : financialBlueLightStyles;

  // 应用样式到各个元素
  Object.entries(styles).forEach(([selector, styleProps]) => {
    if (selector === '#writing-assistant') {
      // 容器样式 - 应用到根元素
      const rootElement = temp.firstElementChild;
      if (rootElement) {
        const existingStyle = rootElement.getAttribute('style') || '';
        const newStyles = stylesToString(styleProps);
        rootElement.setAttribute('style', `${existingStyle} ${newStyles}`);
      }
    } else if (selector.startsWith('.')) {
      // 类选择器 - 使用 querySelectorAll
      const elements = temp.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const existingStyle = el.getAttribute('style') || '';
          const newStyles = stylesToString(styleProps);
          el.setAttribute('style', `${existingStyle} ${newStyles}`);
        }
      });
    } else {
      // 标签选择器
      const elements = temp.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const existingStyle = el.getAttribute('style') || '';
          const newStyles = stylesToString(styleProps);
          el.setAttribute('style', `${existingStyle} ${newStyles}`);
        }
      });
    }

  return temp.innerHTML;
}
