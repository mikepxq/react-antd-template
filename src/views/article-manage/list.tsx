import React, { useEffect, useState } from "react";
import { Button, Form, Space, Table } from "antd";
import AppInput from "@/components/app-input";
import ContentMain from "@/console-layout/content-main";
import HotStar from "@/components/hot-star";

interface Props {
  [key: string]: any;
}
const ArticleList: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const [res] = useState({
    list: [{ id: 0, name: "TEST", hot: 2 }] as ArticleItem[],
  });
  const getList = async () => {
    // const res = await reqAuthManageList();
    // if (res.code != 200) return appMessage.error(res.message || "加载数据失败！");
    // appMessage.success(res.message || "加载数据成功！");
    // res.data.list = res.data.list.map((item, index) => ({ ...item, sn: index + 1 }));
    // setRes({
    //   list: res.data.list,
    // });
  };
  useEffect(() => {
    getList();
  }, []);
  const [form] = Form.useForm();

  let columns: Antd.TableColumnsType<ArticleItem> = [
    {
      key: "sn",
      title: "序号",
      width: 100,
    },
    {
      key: "name",
      title: "文章名称",
    },
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
          <Form.Item label="文章名称" name="username">
            <AppInput placeholder="请输入文章名称" />
          </Form.Item>
        </Form>
        <nav style={{ marginTop: 10 }}></nav>
      </header>
      <Table dataSource={res.list} columns={columns} rowKey="id" style={{ marginTop: 10 }}></Table>
    </ContentMain>
  );
};
export default ArticleList;
