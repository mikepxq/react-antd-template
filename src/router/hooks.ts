import { useState, useEffect } from 'react';
import { useMatches, useLocation } from 'react-router-dom';
type CrumbItemType = {
  title?: string;
  path: string;
  isCrumbLink?: boolean;
};
/**
 * 获得面包屑列表
 * @returns
 */
export const useBreadCrumbList = () => {
  const [list, setList] = useState<CrumbItemType[]>([]);
  const matches = useMatches();
  const location = useLocation();
  useEffect(() => {
    // 只有title的生产面包屑
    setList(
      matches
        .filter((item) => item.handle?.title)
        .map((item) => ({ title: item.handle?.title, path: item.pathname, isCrumbLink: item.handle.isCrumbLink }))
    );
  }, [location.pathname]);
  return [list];
};
/**
 * 找到匹配的当前路由配置项
 * - 内部有handle
 * @returns
 */
export const useCurrentMatch = () => {
  const matches = useMatches();
  const location = useLocation();
  return matches.filter((item) => item.pathname == location.pathname)[0];
};
