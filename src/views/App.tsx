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
  const init = async () => {
    if (!token) setIsInitEnd(true);
    await fetchUserInfo();
    setIsInitEnd(true);
  };
  useEffect(() => {
    console.log("[init]");
    init();
  }, []);
  return (
    // deving
    <>
      {isInitEnd ? (
        <Suspense fallback={<LazyLoading />}>
          <Router>
            <RouteView routes={routeList} className="m-page" />
          </Router>
        </Suspense>
      ) : (
        <div>init</div>
      )}
    </>
  );
};
export default App;
