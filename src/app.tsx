import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useCurrentRoute, useRouteListDom } from '@/router/hooks';

interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const App: React.FC<ViewProps<Props>> = () => {
  const currentRoute = useCurrentRoute();
  // 页面准备好
  useEffect(() => {
    const initDom = document.getElementById('init');
    if (!initDom) return;
    /** 跳过权限路由 初始操作 */
    if (currentRoute?.isAuth) return;
    initDom.classList.add('initEnd');
  }, []);
  const RouteListDom = useRouteListDom();

  return (
    <>
      <RouteListDom></RouteListDom>
      <Outlet />
    </>
  );
};
export default App;
