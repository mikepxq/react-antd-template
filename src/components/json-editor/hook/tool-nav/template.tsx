import { Input, Modal, Tag } from 'antd';
import React, { useRef, useState } from 'react';
interface ButtonProps {
  active?: any;
}
const TemplateString = `[
  {
    "title": "模块标题",
    "partList": [
      {
        "title": "段落标题-排序列表",
        "orderType": "number",
        "list": [
          "直接文案",
          {
            "text": "子序标题:-字母排序",
            "orderType": "alpha",
            "list": [
              "子列表"
            ]
          }
        ]
      }
    ]
  }
]`;
export const useTemplate = () => {
  const isShowRef = useRef(false); //全局不变数据
  const [, setIsShow] = useState(isShowRef.current); //触发更新
  const activeRef = useRef(undefined); //全局不变数据

  const _Button = useRef<React.FC<ViewProps<ButtonProps>>>((props) => (
    <Tag
      onClick={() => {
        setIsShow((isShowRef.current = true)); // isShowRef 真正使用的值// setIsShow 触发更新
        activeRef.current = props.active;
      }}>
      {props.children}
    </Tag>
  ));
  const _Modal = useRef<React.FC<ViewProps>>((props) => {
    return (
      <Modal
        bodyStyle={{ height: 500, overflow: 'auto' }}
        title="模板字符"
        open={isShowRef.current}
        // onOk={() => {}}
        onCancel={() => {
          setIsShow((isShowRef.current = false));
        }}
        footer={null}>
        <Input.TextArea autoSize value={TemplateString} readOnly></Input.TextArea>
      </Modal>
    );
  });
  return {
    Button: _Button.current,
    Modal: _Modal.current,
  };
};
/**  */
const Template: React.FC<ViewProps> = (props) => {
  const T = useTemplate();
  return (
    <>
      <T.Button>模板</T.Button>
      <T.Modal></T.Modal>
    </>
  );
};

export default Template;
