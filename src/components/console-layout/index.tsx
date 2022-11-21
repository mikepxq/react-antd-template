import { Layout } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Aside from './aside';
import ContainerHeader from './header';
import './style.scss';
// interface Props {
//   [key: string]: any;
// }
/** 默认去除前后空格 */
const ConsoleLayout: React.FC<ViewProps> = (props) => {
  const { className = '' } = props;
  const [collapsed, setCollapsed] = useState(false);
  //render
  return (
    <Layout className={`layout page ${className}`}>
      {/*  */}
      <Aside collapsed={collapsed} routes={props.to?.children} />
      {/* 容器 */}
      <Layout.Content className="container">
        {/*  */}
        <ContainerHeader
          collapsed={collapsed}
          onChangeCollapsed={(v) => {
            setCollapsed(v);
          }}
        />
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
// 避免更换路由时 避免重复渲染
export default React.memo(ConsoleLayout);
