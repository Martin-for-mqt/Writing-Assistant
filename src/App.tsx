import { useState, useEffect } from 'react';
import { Layout, Row, Col, message } from 'antd';
import { MarkdownEditor } from './components/Editor';
import { FormatToolbar } from './components/Toolbar';
import { WeChatPreview } from './components/WeChatFormatter';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { markdownToHtml } from './utils/markdownParser';
import { copyHtmlContent } from './utils/clipboard';
import { getDefaultTheme } from './utils/themes';
import type { Theme } from './utils/themes';

const { Header, Content } = Layout;

function App() {
  const [markdown, setMarkdown] = useState<string>(`# 欢迎使用写作助手

这是一个专业的**微信公众号** Markdown 编辑器，支持 13 种精美主题样式，帮助你快速创建美观的公众号文章。

## 核心功能

编辑器支持以下强大功能：

- **实时转换** - 输入 Markdown 立即预览
- **13种主题** - 基于 bm.md 的精美样式
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

  // Auto-convert Markdown to HTML
  const convertToHtml = async (md: string) => {
    if (!md.trim()) {
      setWeChatHtml('');
      return;
    }

    setLoading(true);
    try {
      const html = await markdownToHtml(md);
      // 直接使用 HTML，样式通过 #writing-assistant ID 应用
      setWeChatHtml(html);
    } catch (error) {
      console.error('Conversion failed:', error);
      message.error('转换失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // Initialize and convert on mount
  useEffect(() => {
    convertToHtml(markdown);
  }, []);

  // Handle Markdown change with auto-convert
  const handleMarkdownChange = (value: string | undefined) => {
    const newMarkdown = value || '';
    setMarkdown(newMarkdown);
    convertToHtml(newMarkdown);
  };

  // Handle theme change
  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
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
    <Layout style={{ height: '100vh', background: '#f5f5f5' }}>
      <Header style={{ padding: 0, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <FormatToolbar
          onCopy={handleCopy}
          onClear={handleClear}
          onExport={handleExport}
          hasContent={hasContent}
        />
      </Header>

      <Content style={{ padding: '16px', overflow: 'auto', background: '#f5f5f5' }}>
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
            />
            <WeChatPreview html={wechatHtml} theme={currentTheme} loading={loading} isDarkMode={false} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
