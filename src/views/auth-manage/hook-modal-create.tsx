import { Button, Form, Modal } from "antd";
import React, { useRef, useState } from "react";
import FormItemAuthTree from "./components/form-item-auth-tree";

interface ButtonProps {
  [key: string]: any;
}
interface ModalProps {
  [key: string]: any;
}

const useModalCreate = () => {
  const isShowRef = useRef(false);
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
  const [form] = Form.useForm();
  const _Modal = useRef<React.FC<ViewProps<ModalProps>>>(() => {
    // props;/
    // const { key } = props;
    console.log("[isShowRef.current]", isShowRef.current);
    return (
      <Modal
        title="添加角色"
        visible={isShowRef.current}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}>
        <Form form={form}>
          <FormItemAuthTree />
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
