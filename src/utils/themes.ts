/**
 * 公众号主题配置 - 基于 bm.md Markdown 样式
 * 参考：https://github.com/miantiao-me/bm.md
 */

export interface Theme {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  category: 'minimal' | 'modern' | 'creative' | 'classic';
  // 主题预览色（用于主题选择器）
  previewColor: string;
}

export const themes: Theme[] = [
  {
    id: 'financial-blue',
    name: '财经蓝',
    nameEn: 'Financial Blue',
    description: '专业简约，深蓝+金色，支持暗黑模式',
    category: 'minimal',
    previewColor: '#d4a855',
  },
];

export const getTheme = (themeId: string): Theme => {
  return themes.find(theme => theme.id === themeId) || themes[0];
};

export const getDefaultTheme = (): Theme => themes[0];

// 按分类获取主题
export const getThemesByCategory = (category: Theme['category']): Theme[] => {
  return themes.filter(theme => theme.category === category);
};

// 所有分类
export const themeCategories: { key: Theme['category']; label: string }[] = [
  { key: 'minimal', label: '简约' },
  { key: 'modern', label: '现代' },
  { key: 'creative', label: '创意' },
  { key: 'classic', label: '经典' },
];
