import React from 'react';
import { Select, Switch, Space, Typography, Card, Divider } from 'antd';
import { MoonOutlined, SunOutlined, BgColorsOutlined } from '@ant-design/icons';
import { themes } from '@/utils/themes';
import type { Theme } from '@/utils/themes';

const { Text } = Typography;
const { Option } = Select;

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  isDarkMode: boolean;
  onDarkModeChange: (isDark: boolean) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
  isDarkMode,
  onDarkModeChange,
}) => {
  return (
    <Card
      size="small"
      style={{
        marginBottom: 16,
        backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 主题选择 */}
        <div>
          <Space style={{ marginBottom: 8 }}>
            <BgColorsOutlined style={{ color: isDarkMode ? '#8fabff' : '#576b95' }} />
            <Text strong style={{ color: isDarkMode ? '#fff' : '#000' }}>
              主题风格
            </Text>
          </Space>
          <Select
            value={currentTheme.id}
            onChange={(themeId) => {
              const theme = themes.find(t => t.id === themeId);
              if (theme) onThemeChange(theme);
            }}
            style={{ width: '100%' }}
            placeholder="选择主题"
          >
            {themes.map(theme => (
              <Option key={theme.id} value={theme.id}>
                <Space>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: theme.colors.primary,
                      border: '2px solid #fff',
                      boxShadow: '0 0 0 1px #d9d9d9',
                    }}
                  />
                  <span>{theme.name}</span>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    - {theme.description}
                  </Text>
                </Space>
              </Option>
            ))}
          </Select>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* 深色模式切换 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <SunOutlined style={{ color: isDarkMode ? '#666' : '#1890ff' }} />
            <Text style={{ color: isDarkMode ? '#ccc' : '#333' }}>浅色</Text>
            <Switch
              checked={isDarkMode}
              onChange={onDarkModeChange}
              size="small"
              checkedChildren="深色"
              unCheckedChildren="浅色"
            />
            <Text style={{ color: isDarkMode ? '#ccc' : '#333' }}>深色</Text>
            <MoonOutlined style={{ color: isDarkMode ? '#1890ff' : '#666' }} />
          </Space>
        </div>
      </Space>
    </Card>
  );
};
