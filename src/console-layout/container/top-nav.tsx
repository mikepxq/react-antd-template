import { useGetPathnameRoute } from "@/routes/hooks";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import React from "react";

interface Props {
  [key: string]: any;
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
}
export type TopNavProps = Props;
const TopNav: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed, onChangeCollapsed } = props;

  const { currentRoute } = useGetPathnameRoute(); //当前路由
  currentRoute.breadCrumbRoutes = currentRoute.breadCrumbRoutes || [];

  //render
  return (
    <section className="top-nav">
      <MenuFoldOutlined
        className={`icon ${collapsed ? "collapsed" : ""}`}
        onClick={() => {
          onChangeCollapsed && onChangeCollapsed(!collapsed);
        }}
      />
      {/* 面包屑 */}
      <Breadcrumb className="bread-crumbs">
        {currentRoute.breadCrumbRoutes &&
          currentRoute.breadCrumbRoutes.map((route, index) => {
            return (
              <Breadcrumb.Item key={`${route.path}-index`}>
                {(currentRoute.breadCrumbRoutes as []).length - 1 != index ? (
                  <a href={route.path}>{route.name}</a>
                ) : (
                  route.name
                )}
              </Breadcrumb.Item>
            );
          })}
      </Breadcrumb>
    </section>
  );
};
export default TopNav;
