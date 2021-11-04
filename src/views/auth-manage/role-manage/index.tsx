import React, { useEffect, useState } from "react";
import { Button, Form, Space, Table } from "antd";
import AppInput from "@/components/app-input";
import useModalCreate from "./hook-modal-create";
import ContentMain from "@/console-layout/content-main";
import { reqAuthManageList } from "@/apis";
import { appMessage } from "@/plugins/antd";
interface Props {
  [key: string]: any;
}
const AuthManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const [res, setRes] = useState({
    list: [] as AuthManageItem[],
  });
  const getList = async () => {
    const res = await reqAuthManageList();
    if (res.code != 200) return appMessage.error(res.message || "加载数据失败！");
    appMessage.success(res.message || "加载数据成功！");
    res.data.list = res.data.list.map((item, index) => ({ ...item, sn: index + 1 }));
    setRes({
      list: res.data.list,
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const [form] = Form.useForm();
  const ModalCreate = useModalCreate();

  let columns: Antd.TableColumnsType<AuthManageItem> = [
    {
      key: "sn",
      dataIndex: "sn",
      title: "序号",
    },
    {
      key: "roleName",
      dataIndex: "roleName",
      title: "角色名称",
    },
    {
      key: "remark",
      dataIndex: "remark",
      title: "备注",
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
  columns = columns.map((item) => ({ ...item, align: "center" }));
  //render
  return (
    <ContentMain className={className}>
      <header>
        <Form layout="inline" form={form}>
          <Form.Item label="角色名称" name="roleName">
            <AppInput placeholder="请输入角色名称" />
          </Form.Item>
        </Form>
        <nav style={{ marginTop: 10 }}>
          <ModalCreate.Button>添加角色</ModalCreate.Button>
        </nav>
      </header>
      <Table dataSource={res.list} columns={columns} rowKey="id" style={{ marginTop: 10 }}></Table>
      <ModalCreate.Modal></ModalCreate.Modal>
    </ContentMain>
  );
};
export default AuthManage;
