import { Input, InputProps } from 'antd';
import React from 'react';
interface Props extends InputProps {
  autoComplete?: 'off'; //其他再添加
  name?: string; //其他再添加
}
/** 默认去除前后空格 */
const AppInputPassword: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', autoComplete, name, onChange } = props;
  //render
  return (
    <>
      {/* 阻拦浏览器回显 */}
      {autoComplete == 'off' && (
        <input
          tabIndex={-1}
          type="password"
          autoComplete={autoComplete}
          name={name}
          style={{ position: 'fixed', top: -100 }}
        />
      )}
      <Input.Password
        {...props}
        className={className}
        onChange={(e) => {
          e.target.value = e.target.value.trim();
          onChange && onChange(e);
        }}></Input.Password>
    </>
  );
};
export default AppInputPassword;
