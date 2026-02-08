/**
 * Convert HTML to WeChat-compatible format with inline styles
 */

import type { Theme } from './themes';

/**
 * Apply inline styles to HTML for WeChat compatibility
 */
export function formatForWeChat(html: string, theme: Theme, isDarkMode: boolean): string {
  // Create a temporary DOM element to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Get theme colors and styles
  const colors = isDarkMode && theme.darkColors ? theme.darkColors : theme.colors;
  const styles = theme.styles;

  // Process each element
  processNode(temp, colors, styles);

  return temp.innerHTML;
}

/**
 * Recursively process DOM nodes and apply inline styles
 */
function processNode(node: HTMLElement, colors: Theme['colors'], styles: Theme['styles']): void {
  const children = Array.from(node.children);

  for (const child of children) {
    if (child instanceof HTMLElement) {
      applyStyles(child, colors, styles);
      processNode(child, colors, styles);
    }
  }
}

/**
 * Apply inline styles based on element type and theme
 */
function applyStyles(element: HTMLElement, colors: Theme['colors'], styles: Theme['styles']): void {
  const tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case 'h1':
      element.style.fontSize = '22px';
      element.style.fontWeight = 'bold';
      element.style.color = colors.heading;
      element.style.textAlign = styles.h1Align;
      element.style.marginTop = '0';
      element.style.marginBottom = '25px';
      element.style.lineHeight = '1.4';
      element.style.padding = styles.h1Padding;

      // Apply H1 background color (support for gradients)
      if (styles.h1BgColor !== 'transparent') {
        if (styles.h1BgColor.includes('gradient')) {
          element.style.background = styles.h1BgColor;
        } else {
          element.style.backgroundColor = styles.h1BgColor;
        }
      }

      // Apply H1 border
      if (styles.h1Border !== 'none') {
        element.style.border = styles.h1Border;
      }
      break;

    case 'h2':
      element.style.fontSize = '18px';
      element.style.fontWeight = 'bold';
      element.style.color = colors.heading;
      element.style.textAlign = styles.h2Align;
      element.style.marginTop = '35px';
      element.style.marginBottom = '20px';
      element.style.lineHeight = '1.5';

      // Apply H2 style variations
      switch (styles.h2Style) {
        case 'block':
          element.style.backgroundColor = styles.h2BgColor;
          element.style.padding = '12px 20px';
          element.style.borderRadius = '6px';
          break;

        case 'border-left':
          element.style.borderLeft = styles.h2Border;
          element.style.paddingLeft = '12px';
          break;

        case 'border-bottom':
          element.style.borderBottom = styles.h2Border;
          element.style.paddingBottom = '8px';
          break;

        case 'bg-block':
          element.style.backgroundColor = styles.h2BgColor;
          element.style.padding = '12px 20px';
          element.style.borderRadius = '6px';
          element.style.letterSpacing = '1px';
          break;
      }
      break;

    case 'h3':
      element.style.fontSize = '17px';
      element.style.fontWeight = 'bold';
      element.style.color = colors.heading;
      element.style.marginTop = '25px';
      element.style.marginBottom = '15px';
      element.style.lineHeight = '1.5';

      // Apply H3 style variations
      switch (styles.h3Style) {
        case 'simple':
          // No additional styling
          break;

        case 'dot':
          element.style.borderLeft = `3px solid ${colors.primary}`;
          element.style.paddingLeft = '10px';
          break;

        case 'number':
          // Auto-numbered, handled by CSS counter (WeChat doesn't support counters, so we'll add prefix)
          element.style.borderLeft = `3px solid ${colors.primary}`;
          element.style.paddingLeft = '10px';
          break;

        case 'arrow':
          element.style.paddingLeft = '10px';
          break;
      }

      // Add prefix if specified
      if (styles.h3Prefix && !element.textContent?.startsWith(styles.h3Prefix.trim())) {
        element.textContent = styles.h3Prefix + element.textContent;
      }
      break;

    case 'h4':
      element.style.fontSize = '16px';
      element.style.fontWeight = 'bold';
      element.style.color = colors.heading;
      element.style.marginTop = '20px';
      element.style.marginBottom = '12px';
      element.style.lineHeight = '1.5';
      break;

    case 'p':
      element.style.fontSize = '17px';
      element.style.lineHeight = '1.8';
      element.style.color = colors.text;
      element.style.marginBottom = '15px';
      element.style.textAlign = 'justify';
      element.style.textIndent = '2em';

      // First paragraph should not have indent
      if (element.parentElement?.querySelector('p') === element) {
        element.style.textIndent = '0';
      }

      // Apply content background style
      if (styles.contentBg === 'card' && styles.contentPadding !== '0') {
        element.style.backgroundColor = colors.blockquoteBg;
        element.style.padding = styles.contentPadding;
        element.style.borderRadius = '8px';
      }
      break;

    case 'strong':
    case 'b':
      element.style.fontWeight = 'bold';
      element.style.padding = '0 2px';

      // Apply strong text style variations
      switch (styles.strongStyle) {
        case 'color':
          element.style.color = colors.accent;
          break;

        case 'highlight':
          element.style.backgroundColor = colors.codeBg;
          element.style.color = colors.accent;
          element.style.padding = '2px 4px';
          element.style.borderRadius = '3px';
          break;

        case 'underline':
          element.style.color = colors.accent;
          element.style.borderBottom = `2px solid ${colors.primary}`;
          break;

        case 'marker':
          element.style.backgroundColor = 'rgba(255, 235, 59, 0.4)';
          element.style.color = colors.heading;
          element.style.padding = '2px 4px';
          break;
      }
      break;

    case 'em':
    case 'i':
      element.style.fontStyle = 'italic';
      element.style.color = colors.secondary;
      break;

    case 'code':
      element.style.fontFamily = "'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace";
      element.style.backgroundColor = colors.codeBg;
      element.style.padding = '3px 6px';
      element.style.borderRadius = '4px';
      element.style.fontSize = '14px';
      element.style.color = colors.codeText;
      element.style.border = `1px solid ${colors.border}`;
      break;

    case 'pre':
      element.style.backgroundColor = colors.codeBg;
      element.style.color = colors.codeText;
      element.style.padding = '16px';
      element.style.borderRadius = '6px';
      element.style.overflowX = 'auto';
      element.style.margin = '20px 0';
      element.style.fontFamily = "'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace";
      element.style.fontSize = '13px';
      element.style.lineHeight = '1.6';
      element.style.border = `1px solid ${colors.border}`;

      // Process code inside pre
      const codeInPre = element.querySelector('code');
      if (codeInPre) {
        codeInPre.style.backgroundColor = 'transparent';
        codeInPre.style.color = 'inherit';
        codeInPre.style.padding = '0';
        codeInPre.style.border = 'none';
        codeInPre.style.fontSize = 'inherit';
      }
      break;

    case 'blockquote':
      element.style.margin = '20px 0';
      element.style.color = colors.secondary;
      element.style.fontSize = '15px';
      element.style.lineHeight = '1.75';

      // Apply blockquote style variations
      switch (styles.blockquoteStyle) {
        case 'simple':
          element.style.padding = '12px 20px';
          element.style.backgroundColor = 'transparent';
          element.style.borderLeft = `4px solid ${colors.primary}`;
          break;

        case 'card':
          element.style.padding = '12px 20px';
          element.style.backgroundColor = colors.blockquoteBg;
          element.style.borderLeft = `4px solid ${colors.primary}`;
          element.style.borderRadius = '0 4px 4px 0';
          break;

        case 'left-bar':
          element.style.padding = '12px 20px';
          element.style.backgroundColor = 'transparent';
          element.style.borderLeft = `6px solid ${colors.primary}`;
          break;

        case 'quote-icon':
          element.style.padding = '16px 20px';
          element.style.backgroundColor = colors.blockquoteBg;
          element.style.border = `2px solid ${colors.border}`;
          element.style.borderRadius = '8px';
          element.style.position = 'relative';
          // Add quote icon via pseudo-element simulation (prepend text)
          if (!element.querySelector('.quote-icon')) {
            const icon = document.createElement('span');
            icon.className = 'quote-icon';
            icon.textContent = '❝ ';
            icon.style.fontSize = '24px';
            icon.style.color = colors.primary;
            icon.style.lineHeight = '1';
            element.prepend(icon);
          }
          break;
      }
      break;

    case 'ul':
    case 'ol':
      element.style.paddingLeft = '1.8em';
      element.style.margin = '15px 0';
      element.style.lineHeight = '1.8';

      // Apply content background for lists
      if (styles.contentBg === 'card' && styles.contentPadding !== '0') {
        element.style.backgroundColor = colors.blockquoteBg;
        element.style.padding = `${styles.contentPadding} 1.8em 1.8em 1.8em`;
        element.style.borderRadius = '8px';
      }
      break;

    case 'li':
      element.style.marginBottom = '8px';
      element.style.color = colors.text;
      break;

    case 'a':
      element.style.color = colors.primary;
      element.style.textDecoration = 'none';
      element.style.borderBottom = '1px solid transparent';
      break;

    case 'img':
      element.style.maxWidth = '100%';
      element.style.height = 'auto';
      element.style.display = 'block';
      element.style.margin = '15px auto';
      element.style.borderRadius = '6px';
      break;

    case 'table':
      element.style.width = '100%';
      element.style.borderCollapse = 'collapse';
      element.style.margin = '20px 0';
      element.style.fontSize = '15px';
      element.style.borderRadius = '6px';
      element.style.overflow = 'hidden';

      // Style table headers
      const headers = element.querySelectorAll('th');
      headers.forEach(th => {
        const header = th as HTMLElement;
        header.style.border = `1px solid ${colors.border}`;
        header.style.padding = '10px 12px';
        header.style.textAlign = 'left';
        header.style.backgroundColor = colors.primary;
        header.style.color = 'white';
        header.style.fontWeight = 'bold';
      });

      // Style table cells
      const cells = element.querySelectorAll('td');
      cells.forEach(td => {
        const cell = td as HTMLElement;
        cell.style.border = `1px solid ${colors.border}`;
        cell.style.padding = '10px 12px';
        cell.style.textAlign = 'left';
      });

      // Style even rows
      const rows = element.querySelectorAll('tr');
      rows.forEach((row, index) => {
        if (index % 2 === 0) {
          row.style.backgroundColor = colors.blockquoteBg;
        }
      });
      break;

    case 'hr':
      element.style.border = 'none';
      element.style.margin = '30px 0';

      // Apply hr style variations
      switch (styles.hrStyle) {
        case 'line':
          element.style.borderTop = `2px solid ${colors.border}`;
          break;

        case 'dashed':
          element.style.borderTop = `2px dashed ${colors.border}`;
          break;

        case 'dot':
          element.style.borderTop = `2px dotted ${colors.border}`;
          break;

        case 'wave':
          // WeChat doesn't support CSS wave, fallback to gradient
          element.style.background = `linear-gradient(to right, ${colors.primary} 25%, transparent 25%, transparent 50%, ${colors.primary} 50%, ${colors.primary} 75%, transparent 75%, transparent)`;
          element.style.backgroundSize = '20px 2px';
          element.style.height = '2px';
          break;
      }
      break;

    default:
      // Apply base styles to other elements
      element.style.fontSize = '17px';
      element.style.lineHeight = '1.8';
      element.style.color = colors.text;
      break;
  }
}

/**
 * Wrap content in WeChat container
 */
export function wrapInWeChatContainer(html: string, theme: Theme, isDarkMode: boolean): string {
  const colors = isDarkMode && theme.darkColors ? theme.darkColors : theme.colors;
  return `<div class="wechat-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; font-size: 17px; line-height: 1.8; color: ${colors.text}; background-color: ${colors.background}; padding: 20px; max-width: 677px; margin: 0 auto;">${html}</div>`;
}
