import { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd';
import { MarkdownEditor } from './components/Editor';
import { FormatToolbar } from './components/Toolbar';
import { WeChatPreview } from './components/WeChatFormatter';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { markdownToHtml } from './utils/markdownParser';
import { formatForWeChat, wrapInWeChatContainer } from './utils/wechatFormatter';
import { copyHtmlContent } from './utils/clipboard';
import { getDefaultTheme } from './utils/themes';
import type { Theme } from './utils/themes';

const { Header, Content } = Layout;

function App() {
  const [markdown, setMarkdown] = useState<string>(`# 欢迎使用写作助手

这是一个专业的**微信公众号** Markdown 编辑器，帮助你快速创建精美的公众号文章。

## 核心功能

编辑器支持以下强大功能：

- **实时转换** - 输入 Markdown 立即预览
- **多主题支持** - 5种蓝色系主题可选
- **深色模式** - 完美兼容深色背景
- **一键复制** - 直接粘贴到公众号编辑器

### 使用示例

代码高亮展示：

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

greet('WeChat');
\`\`\`

> 优秀的排版能够提升阅读体验，让内容更具吸引力。选择合适的主题可以让文章更具个性。

[点击访问微信公众号平台](https://mp.weixin.qq.com)

开始你的创作之旅吧！
`);

  const [wechatHtml, setWeChatHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(getDefaultTheme());
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Auto-convert Markdown to WeChat format
  const convertToWeChat = async (md: string, theme: Theme, darkMode: boolean) => {
    if (!md.trim()) {
      setWeChatHtml('');
      return;
    }

    setLoading(true);
    try {
      const html = await markdownToHtml(md);
      const formattedHtml = formatForWeChat(html, theme, darkMode);
      const wrappedHtml = wrapInWeChatContainer(formattedHtml, theme, darkMode);
      setWeChatHtml(wrappedHtml);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize and convert on mount
  useEffect(() => {
    convertToWeChat(markdown, currentTheme, isDarkMode);
  }, []);

  // Handle Markdown change with auto-convert
  const handleMarkdownChange = (value: string | undefined) => {
    const newMarkdown = value || '';
    setMarkdown(newMarkdown);
    convertToWeChat(newMarkdown, currentTheme, isDarkMode);
  };

  // Handle theme change
  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    convertToWeChat(markdown, theme, isDarkMode);
  };

  // Handle dark mode change
  const handleDarkModeChange = (darkMode: boolean) => {
    setIsDarkMode(darkMode);
    convertToWeChat(markdown, currentTheme, darkMode);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!wechatHtml) {
      message.warning('没有可复制的内容');
      return;
    }

    const result = await copyHtmlContent(wechatHtml);
    if (result.success) {
      message.success('复制成功！可以直接粘贴到公众号编辑器');
    } else {
      message.error(result.error || '复制失败');
    }
  };

  // Clear all content
  const handleClear = () => {
    setMarkdown('');
    setWeChatHtml('');
    message.info('已清空内容');
  };

  // Export as HTML file
  const handleExport = () => {
    if (!wechatHtml) {
      message.warning('没有可导出的内容');
      return;
    }

    const blob = new Blob([wechatHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wechat-article-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('导出成功！');
  };

  const hasContent = markdown.trim().length > 0;

  return (
    <Layout style={{ height: '100vh', background: '#fff' }}>
      <Header style={{ padding: 0, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <FormatToolbar
          onCopy={handleCopy}
          onClear={handleClear}
          onExport={handleExport}
          hasContent={hasContent}
        />
      </Header>

      <Content style={{ padding: '16px', overflow: 'auto', background: '#fff' }}>
        <Row gutter={16} style={{ height: 'calc(100vh - 120px)' }}>
          {/* Left column: Markdown Editor */}
          <Col span={12} style={{ height: '100%' }}>
            <MarkdownEditor
              value={markdown}
              onChange={handleMarkdownChange}
              height="100%"
            />
          </Col>

          {/* Right column: Theme Switcher and WeChat Preview */}
          <Col span={12} style={{ height: '100%', overflow: 'auto' }}>
            <ThemeSwitcher
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              isDarkMode={isDarkMode}
              onDarkModeChange={handleDarkModeChange}
            />
            <WeChatPreview html={wechatHtml} loading={loading} isDarkMode={isDarkMode} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
