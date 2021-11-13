import { Form } from "antd";
import React, { useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import ContentMain from "@/console-layout/content-main";
import ArticleCollapseForm from "./components/article-collapse-form";
import { sleep } from "@/utils";
import LazySpin from "@/components/lazy-spin";
import queryString from "query-string";
import { reqArticleInfo } from "@/apis";
import { appMessage } from "@/plugins/antd";
import { useHistory } from "react-router-dom";

interface Props {
  [key: string]: any;
}
const ArticleManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //初始数据
  const [isInitEnd, setIsInitEnd] = useState(false);
  const history = useHistory();
  const [id, setId] = useState<number>();
  useEffect(() => {
    const urlValuesMap = queryString.parse(location.search);
    if (!urlValuesMap.id) {
      appMessage.warn("请选择文章编辑");
      history.replace("./list");
      return;
    }
    setId(Number(urlValuesMap.id));
  }, []);
  //
  const getArticleInfo = async () => {
    if (!id) return;
    await reqArticleInfo({ id: id });
    form.setFieldsValue({
      title: "本地测试数据",
      author: "本地测试数据",
    });
    setIsInitEnd(true);
  };
  useEffect(() => {
    getArticleInfo();
  }, [id]);
  //
  const EditorRef = React.createRef<Editor>();
  const [draftLoading, setDraftLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const onDraft = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || draftLoading) return;
    setDraftLoading(true);
    await sleep();
    setDraftLoading(false);
    // const editor = EditorRef.current?.getInstance();
    // const s = editor?.getMarkdown();
    // console.log("[s]", s);
  };
  const onPublish = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form || publishLoading) return;
    setPublishLoading(true);
    await sleep();
    setPublishLoading(false);
    // const editor = EditorRef.current?.getInstance();
    // const s = editor?.getMarkdown();
    // console.log("[s]", s);
  };
  const [form] = Form.useForm();
  if (!isInitEnd) return <LazySpin />;
  //render
  return (
    <ContentMain className={`${className} flex-column`}>
      <ArticleCollapseForm
        form={form}
        onDraft={onDraft}
        draftLoading={draftLoading}
        publishLoading={publishLoading}
        onPublish={onPublish}
      />
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
