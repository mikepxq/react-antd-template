import { useGetPathnameRoute } from "@/routes/hooks";
import { Breadcrumb } from "antd";

import React from "react";

interface Props {
  [key: string]: any;
}
const TopNavBreadcrumb: React.FC<ViewProps<Props>> = () => {
  const { currentRoute } = useGetPathnameRoute(); //当前路由
  currentRoute.breadCrumbRoutes = currentRoute.breadCrumbRoutes || [];
  //render
  return (
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
  );
};
export default TopNavBreadcrumb;
