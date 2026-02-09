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
    id: 'ayu-light',
    name: '淡雅',
    nameEn: 'Ayu Light',
    description: '清新淡雅，温暖橙色调',
    category: 'minimal',
    previewColor: '#f29718',
  },
  {
    id: 'bauhaus',
    name: '包豪斯',
    nameEn: 'Bauhaus',
    description: '几何现代主义，三原色构成',
    category: 'modern',
    previewColor: '#1040c0',
  },
  {
    id: 'botanical',
    name: '植物园',
    nameEn: 'Botanical',
    description: '自然柔和，植物灵感',
    category: 'classic',
    previewColor: '#2d5a27',
  },
  {
    id: 'green-simple',
    name: '简约绿',
    nameEn: 'Green Simple',
    description: '清新简约，绿色调',
    category: 'minimal',
    previewColor: '#228b22',
  },
  {
    id: 'sketch',
    name: '手绘',
    nameEn: 'Sketch',
    description: '手绘素描风格',
    category: 'creative',
    previewColor: '#5c4033',
  },
  {
    id: 'newsprint',
    name: '报纸',
    nameEn: 'Newsprint',
    description: '报纸印刷风格',
    category: 'classic',
    previewColor: '#4a4a4a',
  },
  {
    id: 'terminal',
    name: '终端',
    nameEn: 'Terminal',
    description: '终端/命令行风格',
    category: 'modern',
    previewColor: '#00ff00',
  },
  {
    id: 'neo-brutalism',
    name: '新野兽派',
    nameEn: 'Neo-Brutalism',
    description: '大胆对比，厚重边框',
    category: 'creative',
    previewColor: '#ff4757',
  },
  {
    id: 'playful-geometric',
    name: '几何',
    nameEn: 'Playful Geometric',
    description: '活泼几何，多彩对比',
    category: 'creative',
    previewColor: '#8b5cf6',
  },
  {
    id: 'professional',
    name: '专业',
    nameEn: 'Professional',
    description: '专业商务风格',
    category: 'minimal',
    previewColor: '#1e40af',
  },
  {
    id: 'organic',
    name: '有机',
    nameEn: 'Organic',
    description: '有机自然风格',
    category: 'classic',
    previewColor: '#6b8e23',
  },
  {
    id: 'maximalism',
    name: '极繁',
    nameEn: 'Maximalism',
    description: '极繁主义，丰富装饰',
    category: 'creative',
    previewColor: '#9333ea',
  },
  {
    id: 'retro',
    name: '复古',
    nameEn: 'Retro',
    description: '复古怀旧风格',
    category: 'classic',
    previewColor: '#cd853f',
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
