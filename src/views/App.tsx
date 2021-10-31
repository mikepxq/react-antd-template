import React, { Suspense, useEffect, useState } from "react";
import { RouterView, useRoutes } from "@/router";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser, useUserDispatch } from "@/store/user";
import InitLoading from "@/components/init-loading";

// 权限 动态路由
const App: React.FC = () => {
  const { routeList } = useRoutes();
  // console.log("[routes]", routeList);
  const [isInitEnd, setIsInitEnd] = useState(false);
  const { token } = useUser();
  const { fetchUserInfo } = useUserDispatch();
  /**初始数据 */
  const init = async () => {
    //0. 暂不处理没登录的
    if (!token) setIsInitEnd(true);
    //1. 获取用户信息（动态权限） 生成路由
    await fetchUserInfo();
    //同步取消屏保
    setIsInitEnd(true);
  };
  //初始
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (!isInitEnd) return;
    document.getElementById("init")?.classList.add("initEnd");
  }, [isInitEnd]);

  return (
    <>
      {/* 路由初始完 避免异步动态路由直接404 */}
      {isInitEnd && (
        <Suspense fallback={<InitLoading />}>
          <Router>
            <RouterView routes={routeList} className="m-page" />
          </Router>
        </Suspense>
      )}
    </>
  );
};
export default App;
