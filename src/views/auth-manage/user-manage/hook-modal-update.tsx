import { reqUserUpdate } from "@/apis";
import AppInput from "@/components/app-input";
import FormRoleOption from "@/components/form-role-option";
import { appMessage } from "@/plugins/antd";
import { Button, Form, Modal } from "antd";
import React, { useRef, useState } from "react";
// import FormItemAuthTree from "../components/form-item-auth-tree";

interface ButtonProps {
  item: UserItem;
}
interface ModalProps {
  onOk?: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const useModalUpdate = () => {
  const isShowRef = useRef(false);
  const activeItem = useRef<UserItem>();
  const [, setIsShow] = useState(isShowRef.current);
  const _Button = useRef<React.FC<ViewProps<ButtonProps>>>((props) => {
    return (
      <Button
        type="primary"
        onClick={() => {
          const { item } = props;
          setIsShow((isShowRef.current = !isShowRef.current)); //触发更新
          activeItem.current = item;
          form.setFieldsValue({
            username: item.username,
            roleId: item.roleId,
          });
        }}>
        {props.children}
      </Button>
    );
  });
  const [form] = Form.useForm<FormDataUserCreate>();

  const _Modal = useRef<React.FC<ViewProps<ModalProps>>>((props) => {
    const { onOk } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);

    return (
      <Modal
        title="编辑用户"
        visible={isShowRef.current}
        confirmLoading={loading}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}
        onOk={async () => {
          const _form = await form.validateFields().catch(() => undefined);
          if (!_form || loading || !activeItem.current) return;
          setLoading(true);
          const res = await reqUserUpdate({ id: Number(activeItem.current.id), ..._form });
          setLoading(false);
          if (res.code != 200) return appMessage.error(res.message || "更新失败！");
          appMessage.success(res.message || "更新成功！");
          setIsShow((isShowRef.current = false));
          onOk && onOk();
        }}>
        <Form form={form} {...layout}>
          <Form.Item name="username" label="用户名称" rules={[{ required: true }]}>
            <AppInput placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item name="roleId" label="所属角色" rules={[{ required: true, message: "请选择所属角色" }]}>
            <FormRoleOption />
          </Form.Item>
        </Form>
      </Modal>
    );
  });
  return {
    Button: _Button.current,
    Modal: _Modal.current,
  };
};
export default useModalUpdate;
