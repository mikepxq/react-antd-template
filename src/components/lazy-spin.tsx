import { Spin } from "antd";
import React from "react";
interface Props {
  [key: string]: any;
}
const LazySpin: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return <Spin size="large" className={`position-center ${className}`}></Spin>;
};
export default LazySpin;
