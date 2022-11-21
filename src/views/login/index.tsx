import AppInput from '@/components/app-input';
import AppInputPassword from '@/components/app-input-password';
import { appMessage, appNotification } from '@/plugins/antd';
import { useUserDispatch } from '@/store/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
const testDataList = [
  { username: 'superAdmin', password: 'superAdmin' },
  { username: 'common', password: 'common' },
];
const Login: React.FC<ViewProps> = () => {
  const [form] = Form.useForm<ReqDataLogin>();
  useEffect(() => {
    form.setFieldsValue({ username: testDataList[0].username, password: testDataList[0].password });
  }, []);
  const [loading, setLoading] = useState(false);
  const { fetchLogin } = useUserDispatch();
  const navigate = useNavigate();
  const onSubmit = async () => {
    const _form = await form.validateFields().catch(() => undefined);
    if (!_form) return;
    if (loading) return;
    setLoading(true);
    const res = await fetchLogin(_form);
    setLoading(false);
    if (res.code != 200) return appMessage.error(res.message || '登录失败');
    appNotification.success({ message: '登录成功' });
    navigate('/console');
  };
  //render
  return (
    <div className={`login-page page `}>
      <div className="form-wrap">
        <h1>用户登录</h1>
        <Form className="form" form={form}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <AppInput name="username" autoComplete="off" prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <AppInputPassword name="password" autoComplete="off" prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" style={{ display: 'block', width: '100%' }} onClick={onSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
        <footer>
          <p>测试用户数据</p>
          <Space>
            {testDataList.map((item, index) => (
              <Button
                key={`${item.password}-${index}`}
                onClick={() => {
                  form.setFieldsValue({
                    username: item.username,
                    password: item.password,
                  });
                }}>
                {item.username}
              </Button>
            ))}
          </Space>
        </footer>
      </div>
    </div>
  );
};
export default Login;
