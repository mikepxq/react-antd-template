import React, { Suspense, useState } from "react";
import { Layout } from "antd";
import Aside from "./aside";
import ContainerHeader from "./header";
import { RouterView } from "@/router";
import LazySpin from "@/components/lazy-spin";

const ConsoleLayout: React.FC<ViewProps> = (props) => {
  const { className = "" } = props;
  const [collapsed, setCollapsed] = useState(false);
  //render
  return (
    <Layout className={`layout ${className}`}>
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
        {/* 主内容区 */}
        <Suspense fallback={<LazySpin />}>
          <RouterView routes={props.to?.children || []}></RouterView>
        </Suspense>
      </Layout.Content>
    </Layout>
  );
};
export default ConsoleLayout;
