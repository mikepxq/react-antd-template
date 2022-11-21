import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nprogress from 'nprogress';
import RouterLoading from './loading';
import { useUser, useUserDispatch } from '@/store/user';
import { getIsOkAuth } from './utils';
const initDom = document.getElementById('init');

interface Props {
  route: RouteItem;
}
/** 默认去除前后空格 */
const RouterBefore: React.FC<ViewProps<Props>> = (props) => {
  const { route } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const user = useUser();
  const { fetchUserInfo } = useUserDispatch();

  // 加载状态判断
  useEffect(() => {
    Nprogress.start();

    //1.如果无此页面
    if (route.path == '*') return Nprogress.done() && undefined;

    //2.白名单直接加载完成
    if (!route.isAuth) return Nprogress.done() && undefined;

    //3.如果未登录
    if (!user.token) {
      navigate('/login', { replace: true });
      Nprogress.done();
      initDom?.classList.add('initEnd');
      return;
    }

    //4.如果没有权限数据
    if (!user.authList) {
      setIsVerifying(true);
      fetchUserInfo();
      return;
    }
    //5.无权限的路由，不要显示入口.
    // if (route.path && !user.authList.includes(route.path)) return navigate('/404');
    Nprogress.done();
  }, [location.pathname]);

  // 异步处理权限
  useEffect(() => {
    if (!route.isAuth || !user.authList || !route.path) return;

    if (!getIsOkAuth(route, user.authList)) return navigate('/404'); //实际去 '*'
    setIsVerifying(false);
    Nprogress.done();
    initDom?.classList.add('initEnd');
  }, [user.authList]);

  //1.这情况应该不会发生
  if (!route.component) return <></>;

  //2.1 权限验证中，持续初始加载效果
  if (isVerifying) {
    initDom?.classList.remove('initEnd');
    return <></>;
  }

  //2.2 权限需要验证 减少渲染
  if (route.isAuth && !user.authList) {
    return <></>;
  }

  //3.懒加载
  if ((route.component as React.LazyExoticComponent<React.FC>).$$typeof) {
    return (
      <Suspense fallback={<RouterLoading onLoadEnd={() => Nprogress.done()}></RouterLoading>}>
        <route.component></route.component>
      </Suspense>
    );
  }

  //render
  return <route.component></route.component>;
};
export default RouterBefore;
