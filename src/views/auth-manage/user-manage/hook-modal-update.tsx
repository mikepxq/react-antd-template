import AppInput from "@/components/app-input";
import { Button, Form, Modal } from "antd";
import React, { useRef, useState } from "react";
// import FormItemAuthTree from "../components/form-item-auth-tree";

interface ButtonProps {
  item: UserItem;
}
interface ModalProps {
  [key: string]: any;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const useModalUpdate = () => {
  const isShowRef = useRef(false);
  const [, setIsShow] = useState(isShowRef.current);
  const _Button = useRef<React.FC<ViewProps<ButtonProps>>>((props) => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setIsShow((isShowRef.current = !isShowRef.current)); //触发更新
          console.log("[]", isShowRef.current);
          // form.setFieldsValue({
          //   roleName: item.roleName,
          //   remark: item.remark,
          //   authTree: {
          //     halfCheckedKeys: item.halfCheckedKeys,
          //     checkedKeys: item.checkedKeys,
          //   },
          // });
        }}>
        {props.children}
      </Button>
    );
  });
  const [form] = Form.useForm<FormDataUserCreate>();

  const _Modal = useRef<React.FC<ViewProps<ModalProps>>>(() => {
    // props;/
    // const { key } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);

    return (
      <Modal
        title="编辑角色"
        visible={isShowRef.current}
        confirmLoading={loading}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}
        onOk={async () => {
          const _form = form.getFieldsValue();
          if (!_form || loading) return;
          setLoading(true);
          // const res = await reqRoleCreate({
          //   roleName: _form.roleName,
          //   checkedKeys: _form.authTree?.checkedKeys || [],
          //   halfCheckedKeys: _form.authTree?.halfCheckedKeys || [],
          //   remark: _form.remark,
          // });
          // setLoading(false);
          // if (res.code != 200) return appMessage.error(res.message || "添加失败！");
        }}>
        <Form form={form} {...layout}>
          <Form.Item name="roleName" label="用户名称" rules={[{ required: true }]}>
            <AppInput placeholder="请输入用户名称" />
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
