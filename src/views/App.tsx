import React from "react";
import { RouteView, useRoutes } from "@/routes";

// 权限 动态路由
const App: React.FC = () => {
  const { routes } = useRoutes();
  return <RouteView routes={routes} className="m-page" />;
};
export default App;
