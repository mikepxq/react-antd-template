import React, { Suspense, useEffect, useState } from "react";
import { RouteView, useRoutes } from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";
import LazyLoading from "@/components/lazy-loading";
import { useUser, useUserDispatch } from "@/store/user";

// 权限 动态路由
const App: React.FC = () => {
  const { routeList } = useRoutes();
  console.log("[routes]", routeList);
  const [isInitEnd, setIsInitEnd] = useState(false);
  const { token } = useUser();
  const { fetchUserInfo } = useUserDispatch();
  /**初始数据 */
  const init = async () => {
    //0. 暂不处理没登录的
    if (!token) setIsInitEnd(true);
    //1. 获取用户信息（动态权限） 生成路由
    await fetchUserInfo();
    setIsInitEnd(true);
  };
  //初始
  useEffect(() => {
    init();
  }, []);
  const [isLazyEnd, setIsLazyEnd] = useState(true); //默认不栏加载

  useEffect(() => {
    if (!isInitEnd || !isLazyEnd) return;
    //此时初始完，按需引入完
    const initDom = document.getElementById("init");
    initDom?.classList.add("initEnd");
  }, [isInitEnd, isLazyEnd]);
  return (
    <Suspense fallback={<LazyLoading onStart={() => setIsLazyEnd(false)} />}>
      <Router>
        <RouteView routes={routeList} className="m-page" />
      </Router>
    </Suspense>
  );
};
export default App;
