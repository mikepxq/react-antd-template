import AppInput from "@/components/app-input";
import { Button, Form, Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormItemAuthTree from "../components/form-item-auth-tree";

interface ButtonProps {
  [key: string]: any;
}
interface ModalProps {
  [key: string]: any;
}
interface FormProps {
  authTree: Antd.TreeCheckedKeys;
}
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const useModalCreate = () => {
  const isShowRef = useRef(true);
  const [, setIsShow] = useState(isShowRef.current);
  const _Button = useRef<React.FC<ViewProps<ButtonProps>>>((props) => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setIsShow((isShowRef.current = !isShowRef.current)); //触发更新
          console.log("[]", isShowRef.current);
        }}>
        {props.children}
      </Button>
    );
  });
  const [form] = Form.useForm<FormProps>();
  const _Modal = useRef<React.FC<ViewProps<ModalProps>>>(() => {
    // props;/
    // const { key } = props;
    return (
      <Modal
        title="添加角色"
        visible={isShowRef.current}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}
        onOk={() => {
          const _form = form.getFieldsValue();
          console.log("[]", _form);
        }}>
        <Form form={form} {...layout}>
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
            <AppInput placeholder="请输入角色名称" />
          </Form.Item>
          <FormItemAuthTree name="authTree" />
          <Form.Item name="remark" label="备注">
            <Input.TextArea placeholder="最多输入100位字符" maxLength={100} />
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
export default useModalCreate;
