import Home from "@/views/home/index";
import Login from "@/views/login";
import Page404 from "@/views/page404";
import ConsoleLayout from "@/console-layout";
import Demo from "@/views/demo";
import { useState } from "react";
import React from "react";

/**
 * 同步路由
 */
export const syncRoutes: RouteItem[] = [
  {
    path: "/",
    component: ConsoleLayout,
    exact: true,
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    exact: true,
    component: Login,
  },
  {
    path: "/demo",
    name: "demo",
    exact: true,
    component: Demo,
  },
  {
    path: "/404",
    name: "404",
    exact: true,
    component: Page404,
  },
];

/**
 * 默认路由
 */
export const defaultRoute: RouteItem = {
  path: "*",
  redirect: "./404",
};

/**
 * 异步动态响应式路由
 */
export const asyncRoutes: RouteItem[] = [
  {
    path: "/console",
    component: ConsoleLayout,
  },
];

// export const useRoutes = (): [RouteItem[], React.Dispatch<React.SetStateAction<RouteItem[]>>] => {
//   return useState([...syncRoutes, defaultRoute]);
// };
export { default as RouteView } from "./route-view";

//1.上下文
const RoutesContext = React.createContext({});
const SetRoutesContext = React.createContext({});
//2.上下文挂值
export const Provider: React.FC = (props) => {
  const [routes, setRoutes] = useState<RouteItem[]>([...syncRoutes, defaultRoute]);
  return (
    <RoutesContext.Provider value={{ routes }}>
      <SetRoutesContext.Provider value={{ setRoutes }}>{props.children}</SetRoutesContext.Provider>
    </RoutesContext.Provider>
  );
};
//3.上下文取值
type TypeUseRoutes = { routes: RouteItem[] };
export const useRoutes = (): TypeUseRoutes => {
  return React.useContext(RoutesContext) as TypeUseRoutes;
};
type TypeUseSetRoutes = { setRoutes: React.Dispatch<React.SetStateAction<RouteItem[]>> };
export const useSetRoutes = (): TypeUseSetRoutes => {
  return React.useContext(SetRoutesContext) as TypeUseSetRoutes;
};
