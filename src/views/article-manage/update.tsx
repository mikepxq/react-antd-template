import { Form } from "antd";
import React, { useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import ContentMain from "@/console-layout/content-main";
import ArticleCollapseForm from "./components/article-collapse-form";
import LazySpin from "@/components/lazy-spin";
import queryString from "query-string";
import { reqArticleInfo, reqArticleUpdate } from "@/apis";
import { appMessage, appNotification } from "@/plugins/antd";
import { useHistory } from "react-router-dom";

interface Props {
  [key: string]: any;
}
type OnSubmitOptions = { publishStatus: ArticleStatus };
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
    // TODO完成api
    await reqArticleInfo({ id: id });
    form.setFieldsValue({ title: "本地测试数据", author: "本地测试数据" });
    setIsInitEnd(true);
  };
  useEffect(() => {
    getArticleInfo();
  }, [id]);
  //
  const EditorRef = React.createRef<Editor>();
  const [loadingMap, setLoadingMap] = useState({ draft: false, publish: false });

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

  const [form] = Form.useForm();
  if (!isInitEnd) return <LazySpin />;
  //render
  return (
    <ContentMain className={`${className} flex-column`}>
      <ArticleCollapseForm
        form={form}
        onDraft={() => {
          onUpdate({ publishStatus: "draft" });
        }}
        draftLoading={loadingMap.draft}
        publishLoading={loadingMap.publish}
        onPublish={() => {
          onUpdate({ publishStatus: "publish" });
        }}
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
