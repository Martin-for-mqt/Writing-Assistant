import MDEditor from '@uiw/react-md-editor';
import '@/styles/global.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  height = '100%',
}) => {
  return (
    <div className="editor-container" style={{ height }}>
      <MDEditor
        value={value}
        onChange={onChange}
        height="100%"
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        data-color-mode="light"
      />
    </div>
  );
};
