import { Form } from "antd";
import React, { useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import ContentMain from "@/console-layout/content-main";
import ArticleCollapseForm from "./components/article-collapse-form";
import { sleep } from "@/utils";
import { initialValue } from "./demo-data";
import { reqArticleDraftCreate, reqArticleDraftUpdate } from "@/apis";
import { appNotification } from "@/plugins/antd";
interface Props {
  [key: string]: any;
}
const ArticleManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const EditorRef = React.createRef<Editor>();
  const [draftLoading, setDraftLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  //文章id
  const [id, setId] = useState<number>();
  /** 新建草稿 */
  const onDraftCreate = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || draftLoading || !EditorRef.current) return;
    const editor = EditorRef.current.getInstance();
    setDraftLoading(true);
    const res = await reqArticleDraftCreate({ ..._form, content: editor.getMarkdown(), publishStatus: "draft" });
    setDraftLoading(false);
    if (res.code != 200) return appNotification.error({ message: res.message || "草稿添加失败！" });
    appNotification.success({ message: res.message || "草稿添加成功！" });
    setId(res.data.id);
  };
  /** 再次保存草稿 */
  const onDraftUpdate = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || draftLoading || !EditorRef.current || id === undefined) return;
    const editor = EditorRef.current.getInstance();
    setDraftLoading(true);
    const res = await reqArticleDraftUpdate({ id, ..._form, content: editor.getMarkdown(), publishStatus: "draft" });
    setDraftLoading(false);
    if (res.code != 200) return appNotification.error({ message: res.message || "草稿更新失败！" });
    appNotification.success({ message: res.message || "草稿更新成功！" });
  };
  const onPublish = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || publishLoading) return;
    setPublishLoading(true);
    await sleep();
    setPublishLoading(false);
    // console.log("[s]", s);
  };
  const [form] = Form.useForm<FormDataArticle>();
  //render
  return (
    <ContentMain className={`${className} flex-column`}>
      <ArticleCollapseForm
        form={form}
        onDraft={() => {
          if (id === undefined) return onDraftCreate();
          onDraftUpdate();
        }}
        draftLoading={draftLoading}
        publishLoading={publishLoading}
        onPublish={onPublish}
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
