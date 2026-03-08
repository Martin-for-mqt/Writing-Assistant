/**
 * 简化的财经蓝主题样式内联
 */

/**
 * 将财经蓝主题样式内联到 HTML
 * 只内联关键样式（颜色、字体），保持简洁实用
 */
export function inlineFinancialBlueTheme(html: string, isDarkMode = false): string {
  // 样式配置
  const colors = isDarkMode ? {
    primary: '#60a5fa',
    accent: '#fbbf24',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    link: '#fbbf24',
  } : {
    primary: '#1e40af',
    accent: '#d4a855',
    text: '#1f2937',
    textSecondary: '#6b7280',
    bg: '#ffffff',
    bgSecondary: '#f8f9fa',
    link: '#d4a855',
  };

  // 创建临时 DOM
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // 应用容器样式
  const container = temp.firstElementChild as HTMLElement;
  if (container) {
    container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
    container.style.fontSize = '16px';
    container.style.lineHeight = '1.7';
    container.style.padding = '1.5em 1em';
    container.style.color = colors.text;
    container.style.backgroundColor = colors.bg;
  }

  // 标题样式
  const headings = temp.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((h) => {
    if (h instanceof HTMLElement) {
      h.style.fontWeight = '600';
      h.style.color = colors.primary;
      h.style.lineHeight = '1.35';
      h.style.marginTop = '1.2em';
      h.style.marginBottom = '0.5em';
    }
  });

  // H1 特殊样式
  temp.querySelectorAll('h1').forEach((h1) => {
    if (h1 instanceof HTMLElement) {
      h1.style.fontSize = '28px';
      h1.style.textAlign = 'center';
      h1.style.paddingBottom = '0.5em';
      h1.style.borderBottom = '2px solid ' + colors.accent;
    }
  });

  // H2 特殊样式
  temp.querySelectorAll('h2').forEach((h2) => {
    if (h2 instanceof HTMLElement) {
      h2.style.fontSize = '21.6px';
      h2.style.padding = '2px 12px';
      h2.style.borderLeft = '4px solid ' + colors.accent;
    }
  });

  // 段落样式
  temp.querySelectorAll('p').forEach((p) => {
    if (p instanceof HTMLElement) {
      p.style.marginBottom = '1em';
      p.style.lineHeight = '1.8';
      p.style.color = colors.text;
    }
  });

  // 加粗文本（金色强调）
  temp.querySelectorAll('strong, b').forEach((strong) => {
    if (strong instanceof HTMLElement) {
      strong.style.fontWeight = '600';
      strong.style.color = colors.accent;
    }
  });

  // 链接样式
  temp.querySelectorAll('a').forEach((a) => {
    if (a instanceof HTMLElement) {
      a.style.color = colors.link;
      a.style.textDecoration = 'underline';
    }
  });

  // 引用块
  temp.querySelectorAll('blockquote').forEach((blockquote) => {
    if (blockquote instanceof HTMLElement) {
      blockquote.style.borderLeft = '4px solid ' + colors.accent;
      blockquote.style.padding = '12px 20px';
      blockquote.style.margin = '1em 0';
      blockquote.style.background = isDarkMode ? '#1e3a5f' : '#eff6ff';
    }
  });

  // 代码
  temp.querySelectorAll('code').forEach((code) => {
    if (code instanceof HTMLElement) {
      code.style.backgroundColor = colors.bgSecondary;
      code.style.color = colors.primary;
      code.style.padding = '2px 4px';
      code.style.borderRadius = '3px';
    }
  });

  return temp.innerHTML;
}
