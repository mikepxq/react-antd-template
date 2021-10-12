import AppInput from "@/components/app-input";
import AppInputPassword from "@/components/app-input-password";
import { appMessage } from "@/plugins/antd";
import { useUserDispatch } from "@/store/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.less";
const Login: React.FC<ViewProps> = (props) => {
  const { className } = props;
  const [form] = Form.useForm<ReqDataLogin>();
  const [loading, setLoading] = useState(false);
  const { fetchLogin } = useUserDispatch();
  const history = useHistory();
  const onSubmit = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form) return;
    if (loading) return;
    setLoading(true);
    const res = await fetchLogin(_form);
    setLoading(false);
    if (res.code != 200) appMessage.error(res.message || "登录失败");
    history.push("/");
  };
  //render
  return (
    <div className={`${className} login-page`}>
      <div className="form-wrap">
        <h1>用户登录</h1>
        <Form className="form" form={form}>
          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
            <AppInput name="username" autoComplete="off" prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
            <AppInputPassword name="password" autoComplete="off" prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" style={{ display: "block", width: "100%" }} onClick={onSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
