import { Button } from "antd";
import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import ContentMain from "@/console-layout/content-main";
interface Props {
  [key: string]: any;
}
const ArticleManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const EditorRef = React.createRef<Editor>();
  const onSaveDraft = () => {
    const editor = EditorRef.current?.getInstance();
    const s = editor?.getMarkdown();
    console.log("[s]", s);
  };
  //render
  return (
    <ContentMain className={`${className} flex-column`}>
      <nav>
        <Button onClick={onSaveDraft}>草稿</Button>
      </nav>
      <main className="all-remain" style={{ marginTop: 10 }}>
        <Editor
          initialValue="h react editor"
          previewStyle="vertical"
          initialEditType="markdown"
          ref={EditorRef}
          height="100%"
        />
      </main>
    </ContentMain>
  );
};
export default ArticleManage;
