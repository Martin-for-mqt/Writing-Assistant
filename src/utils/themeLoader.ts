/**
 * 主题 CSS 加载器
 * 使用 Vite 的动态 import 来加载主题样式
 */

class ThemeLoader {
  private currentThemeId: string | null = null;
  private styleElement: HTMLStyleElement | null = null;
  private loadedModules: Set<string> = new Set();

  /**
   * 加载主题 CSS
   */
  async loadTheme(themeId: string): Promise<void> {
    // 如果是同一个主题，不重复加载
    if (this.currentThemeId === themeId) {
      return;
    }

    try {
      // 使用动态 import 加载 CSS
      const module = await import(`../themes/${themeId}.css?inline`);

      // 创建或更新 style 元素
      if (!this.styleElement) {
        this.styleElement = document.createElement('style');
        this.styleElement.id = 'theme-stylesheet';
        document.head.appendChild(this.styleElement);
      }

      // 使用 CSS 内容
      this.styleElement.textContent = module.default || module;
      this.currentThemeId = themeId;
      this.loadedModules.add(themeId);
    } catch (error) {
      console.error(`Failed to load theme ${themeId}:`, error);
      throw error;
    }
  }

  /**
   * 移除当前主题
   */
  removeTheme(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
      this.currentThemeId = null;
    }
  }

  /**
   * 获取当前主题 ID
   */
  getCurrentThemeId(): string | null {
    return this.currentThemeId;
  }

  /**
   * 获取已加载的主题列表
   */
  getLoadedThemes(): string[] {
    return Array.from(this.loadedModules);
  }
}

// 导出单例
export const themeLoader = new ThemeLoader();
