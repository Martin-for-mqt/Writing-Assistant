/**
 * 公众号蓝色系主题配置 - 基于主流样式设计
 * 参考：135编辑器、365编辑器等主流平台
 */

export interface Theme {
  id: string;
  name: string;
  description: string;
  style: 'minimal' | 'business' | 'tech' | 'elegant' | 'cartoon';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    heading: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
    codeBg: string;
    codeText: string;
    blockquoteBg: string;
    blockquoteBorder: string;
  };
  darkColors?: {
    primary: string;
    secondary: string;
    accent: string;
    heading: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
    codeBg: string;
    codeText: string;
    blockquoteBg: string;
    blockquoteBorder: string;
  };
  styles: {
    // 标题样式
    h1Align: 'left' | 'center' | 'right';
    h1BgColor: string;
    h1Border: string;
    h1Padding: string;

    h2Style: 'block' | 'border-left' | 'border-bottom' | 'bg-block';
    h2BgColor: string;
    h2Border: string;
    h2Align: 'left' | 'center';

    h3Style: 'simple' | 'dot' | 'number' | 'arrow';
    h3Prefix: string;

    // 内容样式
    contentBg: 'transparent' | 'card' | 'stripe';
    contentPadding: string;

    // 强调样式
    strongStyle: 'color' | 'highlight' | 'underline' | 'marker';

    // 分隔样式
    hrStyle: 'line' | 'dashed' | 'dot' | 'wave';

    // 引用样式
    blockquoteStyle: 'simple' | 'card' | 'left-bar' | 'quote-icon';
  };
}

// 极简蓝 - 经典微信风格
export const themes: Theme[] = [
  {
    id: 'classic',
    name: '极简蓝',
    description: '微信经典风格，简洁专业',
    style: 'minimal',
    colors: {
      primary: '#576b95',
      secondary: '#7a869a',
      accent: '#3b5998',
      heading: '#2c2c2c',
      text: '#3f3f3f',
      textLight: '#5f6368',
      background: '#ffffff',
      border: '#e8eaed',
      codeBg: '#f1f3f4',
      codeText: '#c0322b',
      blockquoteBg: '#f8f9fa',
      blockquoteBorder: '#576b95',
    },
    darkColors: {
      primary: '#8fabff',
      secondary: '#9aa0a6',
      accent: '#8ab4f8',
      heading: '#e8eaed',
      text: '#bdc1c6',
      textLight: '#9aa0a6',
      background: '#1a1a1a',
      border: '#3c4043',
      codeBg: '#2d2d2d',
      codeText: '#f28b82',
      blockquoteBg: '#2d2d2d',
      blockquoteBorder: '#8fabff',
    },
    styles: {
      h1Align: 'center',
      h1BgColor: 'transparent',
      h1Border: 'none',
      h1Padding: '0 10px',
      h2Style: 'bg-block',
      h2BgColor: '#f5f5f5',
      h2Border: 'none',
      h2Align: 'center',
      h3Style: 'simple',
      h3Prefix: '',
      contentBg: 'transparent',
      contentPadding: '0',
      strongStyle: 'color',
      hrStyle: 'line',
      blockquoteStyle: 'left-bar',
    },
  },

  // 商务蓝 - 适合企业和正式场合
  {
    id: 'business',
    name: '商务蓝',
    description: '专业稳重，适合企业服务',
    style: 'business',
    colors: {
      primary: '#0056b3',
      secondary: '#0069d9',
      accent: '#003d82',
      heading: '#1a1a1a',
      text: '#2c2c2c',
      textLight: '#495057',
      background: '#ffffff',
      border: '#dee2e6',
      codeBg: '#e9ecef',
      codeText: '#c7254e',
      blockquoteBg: '#f1f3f5',
      blockquoteBorder: '#0056b3',
    },
    darkColors: {
      primary: '#3395ff',
      secondary: '#66b3ff',
      accent: '#1a73e8',
      heading: '#e8eaed',
      text: '#c5c9cd',
      textLight: '#9aa0a6',
      background: '#0d1b2a',
      border: '#1b263b',
      codeBg: '#1b263b',
      codeText: '#ff6b6b',
      blockquoteBg: '#1b263b',
      blockquoteBorder: '#3395ff',
    },
    styles: {
      h1Align: 'left',
      h1BgColor: 'transparent',
      h1Border: 'none',
      h1Padding: '0',
      h2Style: 'border-bottom',
      h2BgColor: 'transparent',
      h2Border: '3px solid #0056b3',
      h2Align: 'left',
      h3Style: 'number',
      h3Prefix: '',
      contentBg: 'card',
      contentPadding: '16px',
      strongStyle: 'highlight',
      hrStyle: 'dashed',
      blockquoteStyle: 'card',
    },
  },

  // 科技蓝 - 未来感和创新
  {
    id: 'tech',
    name: '科技蓝',
    description: '现代科技感，适合IT互联网',
    style: 'tech',
    colors: {
      primary: '#00d4ff',
      secondary: '#0099cc',
      accent: '#00ffff',
      heading: '#0f172a',
      text: '#1e293b',
      textLight: '#475569',
      background: '#ffffff',
      border: '#e0f2fe',
      codeBg: '#0c4a6e',
      codeText: '#38bdf8',
      blockquoteBg: '#e0f2fe',
      blockquoteBorder: '#00d4ff',
    },
    darkColors: {
      primary: '#22d3ee',
      secondary: '#06b6d4',
      accent: '#67e8f9',
      heading: '#e0f2fe',
      text: '#94a3b8',
      textLight: '#64748b',
      background: '#0f172a',
      border: '#1e293b',
      codeBg: '#0c4a6e',
      codeText: '#7dd3fc',
      blockquoteBg: '#1e293b',
      blockquoteBorder: '#22d3ee',
    },
    styles: {
      h1Align: 'center',
      h1BgColor: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
      h1Border: 'none',
      h1Padding: '20px',
      h2Style: 'block',
      h2BgColor: '#e0f2fe',
      h2Border: 'none',
      h2Align: 'center',
      h3Style: 'arrow',
      h3Prefix: '▸ ',
      contentBg: 'stripe',
      contentPadding: '0',
      strongStyle: 'marker',
      hrStyle: 'wave',
      blockquoteStyle: 'simple',
    },
  },

  // 雅致蓝 - 文艺清新
  {
    id: 'elegant',
    name: '雅致蓝',
    description: '淡雅清新，适合文化内容',
    style: 'elegant',
    colors: {
      primary: '#6b9bd1',
      secondary: '#8fb5db',
      accent: '#4a7c9e',
      heading: '#2c3e50',
      text: '#34495e',
      textLight: '#5d6d7e',
      background: '#fafbfc',
      border: '#dfe6e9',
      codeBg: '#f5f6fa',
      codeText: '#e74c3c',
      blockquoteBg: '#f5f6fa',
      blockquoteBorder: '#6b9bd1',
    },
    darkColors: {
      primary: '#a8c8e8',
      secondary: '#c5d9ed',
      accent: '#7aa2c7',
      heading: '#dfe6e9',
      text: '#b2bec3',
      textLight: '#95a5a6',
      background: '#2c3e50',
      border: '#34495e',
      codeBg: '#34495e',
      codeText: '#ff7675',
      blockquoteBg: '#34495e',
      blockquoteBorder: '#a8c8e8',
    },
    styles: {
      h1Align: 'center',
      h1BgColor: 'transparent',
      h1Border: 'none',
      h1Padding: '0',
      h2Style: 'border-left',
      h2BgColor: 'transparent',
      h2Border: '4px solid #6b9bd1',
      h2Align: 'left',
      h3Style: 'dot',
      h3Prefix: '● ',
      contentBg: 'transparent',
      contentPadding: '0',
      strongStyle: 'underline',
      hrStyle: 'dot',
      blockquoteStyle: 'quote-icon',
    },
  },

  // 活力蓝 - 卡通可爱
  {
    id: 'vibrant',
    name: '活力蓝',
    description: '活泼生动，适合轻松内容',
    style: 'cartoon',
    colors: {
      primary: '#4fc3f7',
      secondary: '#81d4fa',
      accent: '#29b6f6',
      heading: '#37474f',
      text: '#455a64',
      textLight: '#607d8b',
      background: '#ffffff',
      border: '#b3e5fc',
      codeBg: '#e1f5fe',
      codeText: '#f44336',
      blockquoteBg: '#e1f5fe',
      blockquoteBorder: '#4fc3f7',
    },
    darkColors: {
      primary: '#4fc3f7',
      secondary: '#81d4fa',
      accent: '#00bcd4',
      heading: '#eceff1',
      text: '#b0bec5',
      textLight: '#78909c',
      background: '#263238',
      border: '#37474f',
      codeBg: '#37474f',
      codeText: '#ef5350',
      blockquoteBg: '#37474f',
      blockquoteBorder: '#4fc3f7',
    },
    styles: {
      h1Align: 'center',
      h1BgColor: '#e1f5fe',
      h1Border: 'none',
      h1Padding: '15px 20px',
      h2Style: 'bg-block',
      h2BgColor: '#b3e5fc',
      h2Border: 'none',
      h2Align: 'center',
      h3Style: 'number',
      h3Prefix: '',
      contentBg: 'transparent',
      contentPadding: '0',
      strongStyle: 'color',
      hrStyle: 'line',
      blockquoteStyle: 'card',
    },
  },
];

export const getTheme = (themeId: string): Theme => {
  return themes.find(theme => theme.id === themeId) || themes[0];
};

export const getDefaultTheme = (): Theme => themes[0];
