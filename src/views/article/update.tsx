import ContentMain from '@/components/console-layout/content-main';
import { appMessage, appNotification } from '@/plugins/antd';
import { Form, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ArticleCollapseForm from './components/article-collapse-form';
import { reqArticleInfo, reqArticleSave } from '@/apis';
import useJsonEditor from '@/components/json-editor/hook';

import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

const ArticleUpdate: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  const [collapseIsOpen, setCollapseIsOpen] = useState(false); //默认显示表单
  const [form] = Form.useForm<FormDataArticle>();
  const [draftLoading, setDraftLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [article, setArticle] = useState<ArticleItem>({ id: Number(searchParams.get('id')), title: '' });
  /** 新建文章 */
  const onSave = async (statusType: Config.TypeStatusKey = 'draft') => {
    // 1.表单数据
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form) return setCollapseIsOpen(true);
    // 2.json 编辑器数据
    const jsonString = JsonEditor.getValue().replace(/ +/g, ' ').replace(/\n/g, '');
    if (draftLoading) return;
    setDraftLoading(true);
    const res = await reqArticleSave({ title: _form.title, id: article.id, jsonString, statusType });
    setDraftLoading(false);
    if (res.code != 200) return appNotification.error({ message: res.message || '保存失败!' });
    appNotification.success({ message: res.message || '保存成功!' });
  };
  const JsonEditor = useJsonEditor();
  const [initLoading, setInitLoading] = useState(true);
  const navigate = useNavigate();

  /** 获取文章信息 */
  const getArticle = async () => {
    const res = await reqArticleInfo({ id: article.id });
    setInitLoading(false);
    if (res.code != 200) {
      appMessage.error(res.message || '文章内容获取失败!');
      navigate('/console/article', { replace: true });
      return;
    }
    form.setFieldsValue({ title: res.data.title });
    res.data.jsonString = res.data.jsonString || '[]';
    res.data.jsonString = JSON.stringify(JSON.parse(res.data.jsonString), null, 2); //格式化
    JsonEditor.setValue(res.data.jsonString);
    setArticle(res.data);
  };
  useEffect(() => {
    if (!article.id) {
      appMessage.warning('请选择文章!');
      navigate('/console/article', { replace: true });
      return;
    }
    getArticle();
  }, []);

  //render
  return (
    <ContentMain className={` ${className} flex-column `}>
      <ArticleCollapseForm
        collapseIsOpen={collapseIsOpen}
        onChangeCollapse={setCollapseIsOpen}
        form={form}
        onDraft={onSave}
        draftLoading={draftLoading}
        onPublish={() => {
          onSave('publish');
        }}
      />
      <Spin spinning={initLoading || draftLoading} wrapperClassName="json-editor-spin">
        <JsonEditor.Editor onSave={onSave} isFormatOnSave></JsonEditor.Editor>
      </Spin>
    </ContentMain>
  );
};
export default ArticleUpdate;
