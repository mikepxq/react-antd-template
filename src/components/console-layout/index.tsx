import RouterView from '@/router/router-view';
import { Layout } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Aside from './aside';
import ContainerHeader from './header';

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
      <Aside collapsed={collapsed} />
      {/* 容器 */}
      <LayoutContent className="container">
        {/*  */}
        <ContainerHeader
          collapsed={collapsed}
          onChangeCollapsed={(v) => {
            setCollapsed(v);
          }}
        />
        <RouterView></RouterView>
      </LayoutContent>
    </Layout>
  );
};
// style
const LayoutContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
`;
// 避免更换路由时 避免重复渲染
export default React.memo(ConsoleLayout);
