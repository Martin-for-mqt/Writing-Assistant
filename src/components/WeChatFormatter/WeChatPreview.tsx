import React, { useEffect, useRef, useState } from 'react';
import { Spin, Space, Typography, Card, message } from 'antd';
import { MobileOutlined } from '@ant-design/icons';
import { themeLoader } from '@/utils/themeLoader';
import type { Theme } from '@/utils/themes';

const { Text } = Typography;

interface WeChatPreviewProps {
  html: string;
  theme: Theme;
  loading?: boolean;
  isDarkMode: boolean;
}

export const WeChatPreview: React.FC<WeChatPreviewProps> = ({
  html,
  theme,
  loading = false,
  isDarkMode,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [themeLoaded, setThemeLoaded] = useState(false);

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
        </Space>
      </Card>

      <div
        ref={previewRef}
        id="writing-assistant"
        style={{
          minHeight: '500px',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
};
