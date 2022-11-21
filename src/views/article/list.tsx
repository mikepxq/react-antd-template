import { reqArticleDelete, reqArticleList } from '@/apis';
import AppInput from '@/components/app-input';
import AppTable from '@/components/app-table';
import ContentMain from '@/components/console-layout/content-main';
import { appConfirm, appMessage } from '@/plugins/antd';
import { getTableSN } from '@/utils';
import { Button, Form, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { ArticleStatusMap } from '@/config';

interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const ArticleList: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm<FormDataArticleList>();
  //
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<ResDataArticleList>({ list: [], total: 0 });
  const [page, setPage] = useState<ReqPageData>({ current: 1, pageSize: 10 });
  const getList = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (loading || !_form) return;
    setLoading(true);
    const res = await reqArticleList({ ...page, ..._form });
    setLoading(false);
    if (res.code != 200) return appMessage.error(res.message || '加载数据失败！');
    // appMessage.success(res.message || "加载数据成功！");//加载数据不做提示
    res.data.list = res.data.list.map((item, index) => ({
      ...item,
      sn: getTableSN(page, index),
      statusMap: ArticleStatusMap[item.statusType as Config.TypeStatusKey],
    }));
    setRes(res.data);
  };
  useEffect(() => {
    getList();
  }, [page]);

  //
  const onDelete = async (item: ArticleItem) => {
    const _result = await appConfirm({ title: '确定删除么?', type: 'warn' });
    if (!_result) return;
    const res = await reqArticleDelete({ id: item.id });
    _result.destroy();
    if (res.code != 200) return appMessage.error(res.message || '删除失败!');
    appMessage.success(res.message || '删除成功!');
    getList();
  };

  //
  let columns: Antd.TableColumnsType<ArticleItem> = [
    { key: 'sn', title: '序号', width: 100 },
    { key: 'title', title: '标题' },
    { key: 'updatedAt', title: '时间' },
    {
      key: 'statusType',
      title: '发布状态',
      render(text, item) {
        return <Tag color={item.statusMap?.color}>{item.statusMap?.text}</Tag>;
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '操作',
      width: 300,
      render(text, item) {
        //text, item
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/console/article/update?id=${item.id}`);
              }}>
              编辑
            </Button>
            <Button
              danger
              onClick={() => {
                onDelete(item);
              }}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  columns = columns.map((item) => ({ ...item, align: 'center', dataIndex: item.key }));

  //render
  return (
    <ContentMain className={`article-list ${className}`}>
      <header>
        <Form layout="inline" form={form}>
          <Form.Item label="文章名称" name="name">
            <AppInput placeholder="请输入文章名称" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  if (page.current == 1) return getList();
                  setPage({ ...page, current: 1 });
                }}>
                查询
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  getList();
                }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <nav style={{ marginTop: 10 }}>
          <Button
            type="primary"
            onClick={() => {
              navigate('/console/article/create');
            }}>
            新建文章 <PlusOutlined />
          </Button>
        </nav>
      </header>
      <AppTable
        loading={loading}
        dataSource={res.list}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 10 }}
        pagination={{
          total: res.total,
        }}
        onChange={({ current, pageSize }) => {
          setPage({ current, pageSize });
        }}></AppTable>
    </ContentMain>
  );
};
export default ArticleList;
