import AppInput from "@/components/app-input";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React from "react";
import "./index.less";
const Login: React.FC<ViewProps> = (props) => {
  const { className } = props;
  const [form] = Form.useForm();
  //render
  return (
    <div className={`${className} login-page`}>
      <div className="form-wrap">
        <h1>用户登录</h1>
        <Form className="form" form={form}>
          <Form.Item name="username">
            <AppInput prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password">
            <AppInput prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
