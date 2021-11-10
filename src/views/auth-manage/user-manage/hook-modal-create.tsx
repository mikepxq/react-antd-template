import { reqUserCreate } from "@/apis";
import AppInput from "@/components/app-input";
import FormRoleOption from "@/components/form-role-option";
import { appMessage } from "@/plugins/antd";
import { Button, Form, Modal } from "antd";
import React, { useRef, useState } from "react";

interface ButtonProps {
  [key: string]: any;
}
interface ModalProps {
  onOk?: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const useModalCreate = () => {
  const isShowRef = useRef(false);
  const [, setIsShow] = useState(isShowRef.current);
  const _Button = useRef<React.FC<ViewProps<ButtonProps>>>((props) => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setIsShow((isShowRef.current = !isShowRef.current)); //触发更新
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
        title="添加角色"
        visible={isShowRef.current}
        confirmLoading={loading}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}
        onOk={async () => {
          const _form = await form.validateFields().catch(() => undefined);
          if (!_form || loading) return;
          setLoading(true);
          const res = await reqUserCreate(_form);
          setLoading(false);
          if (res.code != 200) return appMessage.error(res.message || "添加失败！");
          appMessage.success(res.message || "添加成功！");
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
          {/* <Form.Item name="remark" label="备注">
            <Input.TextArea placeholder="最多输入100位字符" maxLength={100} />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  });
  return {
    Button: _Button.current,
    Modal: _Modal.current,
  };
};
export default useModalCreate;
