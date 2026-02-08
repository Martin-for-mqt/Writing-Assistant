/**
 * Clipboard utilities for copying formatted content
 */

/**
 * Copy content to clipboard with both HTML and plain text formats
 */
export async function copyToClipboard(
  html: string,
  plainText: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Clipboard API is available
    if (!navigator.clipboard) {
      throw new Error('当前浏览器不支持剪贴板API');
    }

    // Create ClipboardItem with both HTML and plain text
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([plainText], { type: 'text/plain' }),
    });

    await navigator.clipboard.write([clipboardItem]);

    return { success: true };
  } catch (error) {
    console.error('Copy failed:', error);

    // Fallback: try using traditional execCommand method
    return fallbackCopy(html, plainText);
  }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopy(_html: string, plainText: string): { success: boolean; error?: string } {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = plainText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);
    textarea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (successful) {
      return { success: true };
    } else {
      return { success: false, error: '复制失败，请手动复制' };
    }
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return { success: false, error: '复制失败，请手动复制' };
  }
}

/**
 * Extract plain text from HTML
 */
export function htmlToPlainText(html: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Replace block elements with newlines
  const blockElements = temp.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, li, br, hr');
  blockElements.forEach((element) => {
    element.after(document.createTextNode('\n\n'));
  });

  return temp.textContent || temp.innerText || '';
}

/**
 * Copy HTML content to clipboard (simplified version)
 */
export async function copyHtmlContent(
  html: string
): Promise<{ success: boolean; error?: string }> {
  const plainText = htmlToPlainText(html);
  return copyToClipboard(html, plainText);
}
