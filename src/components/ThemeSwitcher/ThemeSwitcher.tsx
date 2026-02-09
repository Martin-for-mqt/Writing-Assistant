import React from 'react';
import { Select, Space, Typography, Card, Divider } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { themes, themeCategories, getThemesByCategory, type Theme } from '@/utils/themes';

const { Text } = Typography;
const { Option, OptGroup } = Select;

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <Card
      size="small"
      style={{
        marginBottom: 16,
        backgroundColor: '#fff',
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 主题选择 */}
        <div>
          <Space style={{ marginBottom: 8 }}>
            <BgColorsOutlined style={{ color: currentTheme.previewColor }} />
            <Text strong>主题风格</Text>
          </Space>
          <Select
            value={currentTheme.id}
            onChange={(themeId) => {
              const theme = themes.find(t => t.id === themeId);
              if (theme) onThemeChange(theme);
            }}
            style={{ width: '100%' }}
            placeholder="选择主题"
            optionLabelProp="label"
          >
            {themeCategories.map(category => (
              <OptGroup key={category.key} label={category.label}>
                {getThemesByCategory(category.key).map(theme => (
                  <Option
                    key={theme.id}
                    value={theme.id}
                    label={theme.name}
                  >
                    <Space>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: theme.previewColor,
                          border: '2px solid #fff',
                          boxShadow: '0 0 0 1px #d9d9d9',
                        }}
                      />
                      <span>{theme.name}</span>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {theme.nameEn}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        - {theme.description}
                      </Text>
                    </Space>
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </div>
      </Space>
    </Card>
  );
};
