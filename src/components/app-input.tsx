import { Input, InputProps } from "antd";
import React from "react";
interface Props extends InputProps {
  [key: string]: any;
}
/** 默认去除前后空格 */
const AppInput: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return (
    <Input
      {...props}
      className={className}
      onChange={(e) => {
        e.target.value = e.target.value.trim();
      }}></Input>
  );
};
export default AppInput;
