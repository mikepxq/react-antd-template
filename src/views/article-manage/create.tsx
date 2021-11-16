import { Form } from "antd";
import React, { useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import ContentMain from "@/console-layout/content-main";
import ArticleCollapseForm from "./components/article-collapse-form";

import { initialValue } from "./demo-data";
import { reqArticleCreate, reqArticleUpdate } from "@/apis";
import { appNotification } from "@/plugins/antd";
interface Props {
  [key: string]: any;
}
type OnSubmitOptions = { publishStatus: ArticleStatus };
const ArticleManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const EditorRef = React.createRef<Editor>();
  const [loadingMap, setLoadingMap] = useState({ draft: false, publish: false });
  //文章id
  const [id, setId] = useState<number>();

  /** 新建文章 */
  const onCreate = async (options: OnSubmitOptions) => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || loadingMap[options.publishStatus] || !EditorRef.current) return;
    const editor = EditorRef.current.getInstance();
    setLoadingMap({ ...loadingMap, [options.publishStatus]: true });
    const res = await reqArticleCreate({ ...options, ..._form, content: editor.getMarkdown() });
    setLoadingMap({ ...loadingMap, [options.publishStatus]: false });
    if (res.code != 200) return appNotification.error({ message: res.message || "添加失败！" });
    appNotification.success({ message: res.message || "添加成功！" });
    setId(res.data.id);
  };
  /** 再次保存文章 带上id */
  const onUpdate = async (options: OnSubmitOptions) => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || loadingMap[options.publishStatus] || !EditorRef.current || id === undefined) return;
    const editor = EditorRef.current.getInstance();
    setLoadingMap({ ...loadingMap, [options.publishStatus]: true });
    const res = await reqArticleUpdate({ id, ...options, ..._form, content: editor.getMarkdown() });
    setLoadingMap({ ...loadingMap, [options.publishStatus]: false });
    if (res.code != 200) return appNotification.error({ message: res.message || "更新失败！" });
    appNotification.success({ message: res.message || "更新成功！" });
  };

  const [form] = Form.useForm<FormDataArticle>();
  //render
  return (
    <ContentMain className={`${className} flex-column`}>
      <ArticleCollapseForm
        form={form}
        onDraft={() => {
          if (id === undefined) return onCreate({ publishStatus: "draft" });
          onUpdate({ publishStatus: "draft" });
        }}
        draftLoading={loadingMap.draft}
        publishLoading={loadingMap.publish}
        onPublish={() => {
          if (id === undefined) return onCreate({ publishStatus: "publish" });
          onUpdate({ publishStatus: "publish" });
        }}
      />
      <main className="all-remain" style={{ marginTop: 10 }}>
        <Editor
          initialValue={initialValue}
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
