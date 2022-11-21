import { Input, InputProps } from 'antd';
import React from 'react';
interface Props extends InputProps {
  autoComplete?: 'off'; //其他再添加
  name?: string; //其他再添加
}
/** 默认去除前后空格 */
const AppInput: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', onChange, autoComplete, name } = props;
  //render
  return (
    <>
      {/* 阻拦浏览器回显 */}
      {autoComplete == 'off' && <input tabIndex={-1} name={name} style={{ position: 'fixed', top: -100 }} />}
      <Input
        {...props}
        className={className}
        onChange={(e) => {
          e.target.value = e.target.value.trim();
          onChange && onChange(e);
        }}></Input>
    </>
  );
};
export default AppInput;
