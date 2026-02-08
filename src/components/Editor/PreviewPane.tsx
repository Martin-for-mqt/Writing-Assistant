import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Switch, Space, Typography } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface PreviewPaneProps {
  value: string;
  height?: string;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  value,
  height = '100%',
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div style={{ height, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '8px 12px',
        background: isDarkMode ? '#1e1e1e' : '#fff',
        borderBottom: '1px solid',
        borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text strong style={{ color: isDarkMode ? '#fff' : '#000' }}>
          Markdown 预览
        </Text>
        <Space>
          <SunOutlined style={{ color: isDarkMode ? '#666' : '#1890ff' }} />
          <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            size="small"
          />
          <MoonOutlined style={{ color: isDarkMode ? '#1890ff' : '#666' }} />
        </Space>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <MDEditor
          value={value}
          height="100%"
          preview="preview"
          hideToolbar={true}
          visibleDragbar={false}
          data-color-mode={isDarkMode ? 'dark' : 'light'}
        />
      </div>
    </div>
  );
};
