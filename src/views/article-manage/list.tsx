import React, { useEffect, useState } from "react";
import { Button, Form, Space } from "antd";
import AppInput from "@/components/app-input";
import ContentMain from "@/console-layout/content-main";
import HotStar from "@/components/hot-star";
import AppTable from "@/components/app-table";
import { reqArticleList } from "@/apis";
import { appMessage } from "@/plugins/antd";
import { getTableSN } from "@/utils";

interface Props {
  [key: string]: any;
}
const ArticleList: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const [res, setRes] = useState({ list: [{ id: 0, name: "TEST", hot: 2 }] as ArticleItem[], total: 0 });
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (loading || !_form) return;
    setLoading(true);
    const res = await reqArticleList({ ...page, ..._form });
    if (res.code != 200) return appMessage.error(res.message || "加载数据失败！");
    // appMessage.success(res.message || "加载数据成功！");
    res.data.list = res.data.list.map((item, index) => ({ ...item, sn: getTableSN(page, index) }));
    setRes(res.data);
  };

  const [page, setPage] = useState<ReqPageData>({ current: 1, pageSize: 10 });
  useEffect(() => {
    getList();
  }, [page]);
  const [form] = Form.useForm<FormDataArticleList>();

  let columns: Antd.TableColumnsType<ArticleItem> = [
    { key: "sn", title: "序号", width: 100 },
    { key: "name", title: "文章名称" },
    {
      key: "hot",
      title: "文章名称",
      render(number) {
        return <HotStar number={number} />;
      },
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "操作",
      width: 300,
      render() {
        //text, item
        return (
          <Space>
            <Button>编辑</Button>
          </Space>
        );
      },
    },
  ];
  columns = columns.map((item) => ({ ...item, align: "center", dataIndex: item.key }));
  //render
  return (
    <ContentMain className={className}>
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
        <nav style={{ marginTop: 10 }}></nav>
      </header>
      {/* TODO */}
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
