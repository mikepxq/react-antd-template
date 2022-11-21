import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useCurrentRoute } from '@/router/hooks';

interface Props {
  [key: string]: any;
}
const TopNavBreadcrumb: React.FC<ViewProps<Props>> = () => {
  const currentRoute = useCurrentRoute();
  const [breadCrumbList, setBreadCrumbList] = useState<RouteItem[]>([]);
  useEffect(() => {
    setBreadCrumbList(currentRoute.breadCrumbRouteList as RouteItem[]);
  }, [currentRoute]);
  //render
  return (
    <Breadcrumb className="bread-crumbs">
      {breadCrumbList.map((item, index) => {
        return (
          <Breadcrumb.Item key={`${item.path}-${index}`}>
            {/* 第一个 或者 最后一个 */}
            {index > breadCrumbList.length - 2 ? item.title : <Link to={item.path as string}>{item.title}</Link>}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
export default TopNavBreadcrumb;
