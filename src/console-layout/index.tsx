import React, { Suspense, useState } from "react";
import { Layout } from "antd";
import Aside from "./aside";
import ContainerHeader from "./container/header";
import { RouteView } from "@/routes";
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
      <Layout.Content className="content">
        {/*  */}
        <ContainerHeader
          routes={props.to?.children}
          collapsed={collapsed}
          onChangeCollapsed={(v) => {
            setCollapsed(v);
          }}
        />
        {/* 主内容区 */}
        <Suspense fallback={<LazySpin />}>
          <RouteView routes={props.to?.children || []}></RouteView>
        </Suspense>
      </Layout.Content>
    </Layout>
  );
};
export default ConsoleLayout;
