import React from 'react';
import { Space, Button, Typography } from 'antd';
import {
  CopyOutlined,
  ClearOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface FormatToolbarProps {
  onCopy: () => void;
  onClear: () => void;
  onExport?: () => void;
  hasContent: boolean;
}

export const FormatToolbar: React.FC<FormatToolbarProps> = ({
  onCopy,
  onClear,
  onExport,
  hasContent,
}) => {
  return (
    <div style={{
      padding: '12px 16px',
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Space>
        <FileTextOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
        <Text strong>写作助手 - 公众号编辑器</Text>
      </Space>

      <Space>
        <Button
          icon={<CopyOutlined />}
          onClick={onCopy}
          disabled={!hasContent}
        >
          复制
        </Button>

        {onExport && (
          <Button
            icon={<DownloadOutlined />}
            onClick={onExport}
            disabled={!hasContent}
          >
            导出
          </Button>
        )}

        <Button
          icon={<ClearOutlined />}
          onClick={onClear}
          danger
        >
          清空
        </Button>
      </Space>
    </div>
  );
};
