import React, { Suspense, useEffect, useState } from "react";
import { RouteView, useRoutes } from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";
import LazyLoading from "@/components/lazy-loading";
import { useUser, useUserDispatch } from "@/store/user";
import { Button } from "antd";

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
    init();
    if (!isInitEnd) return;
    console.log("[2]");
    document.getElementById("init")?.classList.add("initEnd");
  }, [isInitEnd]);

  return (
    <>
      <Button
        style={{ position: "fixed", zIndex: 1000 }}
        onClick={() => {
          document.getElementById("init")?.classList.remove("initEnd");
        }}>
        测试
      </Button>
      {/* 路由初始完 避免异步动态路由直接404 */}
      {isInitEnd && (
        <Suspense fallback={<LazyLoading />}>
          <Router>
            <RouteView routes={routeList} className="m-page" />
          </Router>
        </Suspense>
      )}
    </>
  );
};
export default App;
