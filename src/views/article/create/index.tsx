import ContentMain from '@/components/console-layout/content-main';
import { appNotification } from '@/plugins/antd';
import { Form, Spin } from 'antd';
import React, { useState } from 'react';
import ArticleCollapseForm from '../components/article-collapse-form';
import { reqArticleSave } from '@/apis';
import useJsonEditor from '@/components/json-editor/hook';
import { JsonTemplate } from './json-template';
import './style.scss';

interface Props {
  [key: string]: any;
}

const ArticleCreate: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);
  const [form] = Form.useForm<FormDataArticle>();
  const [draftLoading, setDraftLoading] = useState(false);

  //文章id
  const [article, setArticle] = useState({ id: 0 });
  /** 新建文章 */
  const onSave = async (statusType: Config.TypeStatusKey = 'draft') => {
    // 1.表单数据
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form) return setCollapseIsOpen(true);
    // 2.json 编辑器数据
    const jsonString = JsonEditor.getValue().replace(/ +/, ' ').replace(/\n/g, '');
    if (draftLoading) return;
    setDraftLoading(true);
    const res = await reqArticleSave({ title: _form.title, id: article.id, jsonString, statusType });
    setDraftLoading(false);
    if (res.code != 200) return appNotification.error({ message: res.message || '保存失败!' });
    appNotification.success({ message: res.message || '保存成功!' });
    setArticle({ id: res.data.id });
  };

  //
  const JsonEditor = useJsonEditor();

  //render
  return (
    <ContentMain className={` ${className} flex-column`}>
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
      <Spin spinning={draftLoading} wrapperClassName="json-editor-spin">
        <JsonEditor.Editor initValue={JsonTemplate} onSave={onSave}></JsonEditor.Editor>
      </Spin>
    </ContentMain>
  );
};
export default ArticleCreate;
