import { reqRoleCreate } from "@/apis";
import AppInput from "@/components/app-input";
import { appMessage } from "@/plugins/antd";
import { Button, Form, Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormItemAuthTree from "../components/form-item-auth-tree";

interface ButtonProps {
  [key: string]: any;
}
interface ModalProps {
  [key: string]: any;
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
          // console.log("[]", isShowRef.current);
        }}>
        {props.children}
      </Button>
    );
  });
  const [form] = Form.useForm<FormDataRoleCreate>();
  const _Modal = useRef<React.FC<ViewProps<ModalProps>>>((props) => {
    // props
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
          const _form = await form.validateFields().catch((e) => e);
          if (!_form || loading) return;
          setLoading(true);
          const res = await reqRoleCreate({
            roleName: _form.roleName,
            checkedKeys: _form.authTree?.checkedKeys || [],
            halfCheckedKeys: _form.authTree?.halfCheckedKeys || [],
            remark: _form.remark,
          });
          setLoading(false);
          if (res.code != 200) return appMessage.error(res.message || "添加失败！");
          appMessage.success(res.message || "添加成功！");
          setIsShow((isShowRef.current = false));
          onOk && onOk();
        }}>
        <Form form={form} {...layout}>
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
            <AppInput placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea placeholder="最多输入100位字符" maxLength={100} />
          </Form.Item>
          <FormItemAuthTree name="authTree" />
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
