import React, { useEffect, useRef, useState } from 'react';
import { Spin, Space, Typography, Card, message, Switch } from 'antd';
import { MobileOutlined } from '@ant-design/icons';
import { themeLoader } from '@/utils/themeLoader';
import type { Theme } from '@/utils/themes';

const { Text } = Typography;

interface WeChatPreviewProps {
  html: string;
  theme: Theme;
  loading?: boolean;
}

export const WeChatPreview: React.FC<WeChatPreviewProps> = ({
  html,
  theme,
  loading = false,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [themeLoaded, setThemeLoaded] = useState(false);
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

  // 加载主题 CSS
  useEffect(() => {
    const loadTheme = async () => {
      try {
        setThemeLoaded(false);
        await themeLoader.loadTheme(theme.id);
        setThemeLoaded(true);
      } catch (error) {
        message.error(`主题加载失败: ${theme.name}`);
        console.error('Theme load error:', error);
      }
    };

    loadTheme();
  }, [theme]);

  // 更新 HTML 内容
  useEffect(() => {
    if (previewRef.current && html && themeLoaded) {
      previewRef.current.innerHTML = html;
    }
  }, [html, themeLoaded]);

  // 监听系统主题变化
  useEffect(() => {
    // 检查浏览器支持
    if (typeof window === 'undefined' || !window.matchMedia) {
      if (import.meta.env.DEV) {
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
      } catch {
        // sessionStorage 访问失败，仍然跟随系统
        // 此时无法获取 e.matches，保持当前状态
      }
    };

    // 监听系统主题变化
    mediaQuery.addEventListener('change', handleChange);

    // 清理函数
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // 手动切换暗黑模式
  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);

    try {
      sessionStorage.setItem('preview-dark-mode-override', checked.toString());
    } catch {
      if (import.meta.env.DEV) {
        console.warn('Failed to save dark mode preference');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div
      className="wechat-preview-wrapper"
      style={{
        padding: '16px',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
        borderRadius: '8px',
        minHeight: '600px',
      }}
    >
      <Card
        size="small"
        style={{
          marginBottom: 16,
          backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
        }}
      >
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
      </Card>

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
    </div>
  );
};
