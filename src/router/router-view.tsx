import { Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

interface Props {
  [key: string]: any;
}
/** 含有 Spin */
const RouterView: React.FC<ViewProps<Props>> = (props) => {
  const l = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('[l]', l);
    if (!l) return;
    //重定向
    if (l.redirect) return navigate(l.redirect, { replace: true });
  }, []);
  //render
  return (
    <Suspense fallback={<Spin size="large" className="fixed-xy-center"></Spin>}>
      <Outlet></Outlet>
    </Suspense>
  );
};
export default RouterView;
