import React, { useEffect, useState } from "react";
import { Button, Form, Space } from "antd";
import AppInput from "@/components/app-input";
import useModalCreate from "./hook-modal-create";
import ContentMain from "@/console-layout/content-main";
import useModalUpdate from "./hook-modal-update";
import AppTable from "@/components/app-table";
import { reqUserList } from "@/apis";
import { appMessage } from "@/plugins/antd";
import { getTableSN } from "@/utils";
interface Props {
  [key: string]: any;
}
const AuthManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const [res, setRes] = useState({ list: [] as UserItem[], total: 0 });
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (loading || !_form) return;
    setLoading(true);
    const res = await reqUserList({ ...page, ..._form });
    setLoading(false);
    if (res.code != 200) return appMessage.error(res.message || "加载数据失败！");
    // appMessage.success(res.message || "加载数据成功！");//列表数据一般不提示
    res.data.list = res.data.list.map((item, index) => ({ ...item, sn: getTableSN(page, index) }));
    setRes({ list: res.data.list, total: res.data.total });
  };
  const [page, setPage] = useState<ReqPageData>({ current: 1, pageSize: 10 });
  useEffect(() => {
    getList();
  }, [page]);
  const [form] = Form.useForm<FormDataUserList>();
  const ModalCreate = useModalCreate();
  const ModalUpdate = useModalUpdate();

  let columns: Antd.TableColumnsType<UserItem> = [
    { key: "sn", title: "序号", width: 100 },
    { key: "username", title: "用户名称" },
    { key: "roleName", title: "所属角色" },
    {
      key: "actions",
      dataIndex: "actions",
      title: "操作",
      width: 300,
      render(text, item) {
        //
        return (
          <Space>
            <ModalUpdate.Button item={item}>编辑</ModalUpdate.Button>
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
          <Form.Item label="用户名称" name="username">
            <AppInput placeholder="请输入用户名称" />
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
          <ModalCreate.Button>添加角色</ModalCreate.Button>
        </nav>
      </header>
      <AppTable
        dataSource={res.list}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 10 }}
        loading={loading}
        pagination={{ total: res.total }}
        onChange={({ current, pageSize }) => {
          setPage({ current, pageSize });
        }}></AppTable>
      <ModalCreate.Modal
        onOk={() => {
          getList();
        }}></ModalCreate.Modal>
      <ModalUpdate.Modal></ModalUpdate.Modal>
    </ContentMain>
  );
};
export default AuthManage;
