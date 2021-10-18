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
  useUser();
  const { fetchLogin } = useUserDispatch();
  const init = () => {};
  useEffect(() => {}, []);
  return (
    // deving
    <>
      <div>init</div>
      <Suspense fallback={<LazyLoading />}>
        <Router>
          <RouteView routes={routeList} className="m-page" />
        </Router>
      </Suspense>
    </>
  );
};
export default App;
