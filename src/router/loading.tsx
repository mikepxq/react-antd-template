import { Spin } from 'antd';
import React, { useEffect } from 'react';

interface Props {
  onLoadEnd?: () => void;
}
/** 默认去除前后空格 */
const RouterLoading: React.FC<ViewProps<Props>> = (props) => {
  const { onLoadEnd } = props;

  useEffect(() => {
    return () => {
      onLoadEnd && onLoadEnd();
    };
  }, []);
  //render
  return <Spin size="large" className="fixed-xy-center"></Spin>;
};
export default RouterLoading;
