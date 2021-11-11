import { useCurrentRoute } from "@/router/hooks";
import { Breadcrumb } from "antd";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  [key: string]: any;
}
const TopNavBreadcrumb: React.FC<ViewProps<Props>> = () => {
  const { currentRoute } = useCurrentRoute(); //当前路由
  const [breadCrumbRoutes, setBreadCrumbRoutes] = useState<RouteItem[]>([]);
  useEffect(() => {
    if (!currentRoute.breadCrumbRoutes) return;
    setBreadCrumbRoutes(currentRoute.breadCrumbRoutes);
  }, [currentRoute]);
  //
  const history = useHistory();
  //render
  return (
    <Breadcrumb className="bread-crumbs">
      {breadCrumbRoutes.map((route, index) => {
        return (
          <Breadcrumb.Item key={`${route.path}-index`}>
            {/* 没有限制 并且 不是最后一个 */}
            {route.isLinkBreadCrumb !== false && breadCrumbRoutes.length - 1 != index ? (
              <a
                onClick={() => {
                  history.push(route.redirect || route.path);
                }}>
                {route.title || route.name}
              </a>
            ) : (
              route.title || route.name
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
export default TopNavBreadcrumb;
