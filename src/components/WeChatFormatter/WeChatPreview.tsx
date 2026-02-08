import React, { useEffect, useRef } from 'react';
import { Spin, Space, Typography, Card } from 'antd';
import { MobileOutlined } from '@ant-design/icons';
import '@/styles/wechat.css';

const { Text } = Typography;

interface WeChatPreviewProps {
  html: string;
  loading?: boolean;
  isDarkMode: boolean;
}

export const WeChatPreview: React.FC<WeChatPreviewProps> = ({ html, loading = false, isDarkMode }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current && html) {
      previewRef.current.innerHTML = html;
    }
  }, [html]);

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
        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
        borderRadius: '8px',
        minHeight: '400px',
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
          <MobileOutlined style={{ color: isDarkMode ? '#8fabff' : '#576b95' }} />
          <Text strong style={{ color: isDarkMode ? '#e8eaed' : '#000' }}>
            公众号预览
          </Text>
        </Space>
      </Card>

      <div
        ref={previewRef}
        className="wechat-container"
        style={{
          minHeight: '400px',
          backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
          boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
};
