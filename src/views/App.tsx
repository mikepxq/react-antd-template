import React, { Suspense } from "react";
import { RouteView, useRoutes } from "@/routes";
import { BrowserRouter as Router } from "react-router-dom";
import LazyLoading from "@/components/lazy-loading";

// 权限 动态路由
const App: React.FC = () => {
  const { routeList } = useRoutes();
  console.log("[routes]", routeList);
  return (
    // deving bug
    <Suspense fallback={<LazyLoading />}>
      <Router>
        <RouteView routes={routeList} className="m-page" />
      </Router>
    </Suspense>
  );
};
export default App;
