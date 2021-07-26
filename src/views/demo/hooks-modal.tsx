import { Button, Modal } from "antd";
import React, { useRef, useState } from "react";
interface ButtonProps {
  active?: any;
}
const useModal = () => {
  const isShowRef = useRef(false); //全局不变数据
  const [, setIsShow] = useState(isShowRef.current); //触发更新
  const activeRef = useRef(undefined); //全局不变数据

  const _Button = useRef<React.FC<ButtonProps>>((props) => (
    <Button
      onClick={() => {
        setIsShow((isShowRef.current = true)); // isShowRef 真正使用的值// setIsShow 触发更新
        activeRef.current = props.active;
      }}>
      {props.children}
    </Button>
  ));
  const _Modal = useRef<React.FC>((props) => {
    return (
      <Modal
        title="我是一个modal"
        visible={isShowRef.current}
        // onOk={() => {}}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}>
        <h1>适合表单等地方</h1>
        {props.children}
        <p>我被点击了： {activeRef.current}</p>
      </Modal>
    );
  });
  return {
    Button: _Button.current,
    Modal: _Modal.current,
  };
};
export default useModal;
