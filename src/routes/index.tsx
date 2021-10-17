import Home from "@/views/home/index";
import Login from "@/views/login/index";
import Page404 from "@/views/page404";
import ConsoleLayout from "@/console-layout";
// import Demo from "@/views/demo";
import react from "react";

import { UserOutlined } from "@ant-design/icons";

/**
 * 同步路由
 */
export const syncRoutes: RouteItem[] = [
  {
    path: "/",
    exact: true,
    redirect: "/console",
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
  redirect: "/404",
};
/**
 * 控制台路由
 */
export const consoleRoute: RouteItem = {
  path: "/console",
  name: "console",
  component: ConsoleLayout,
  isAuth: true,
  redirect: "/console/auth-manage",
  children: [
    {
      path: "/console/doing",
      name: "doing",
      isAuth: false,
      component: react.lazy(async () => import("@/views/doing")),
      icon: UserOutlined,
    },
    {
      path: "/console/demo",
      name: "demo",
      component: React.lazy(() => import("@/views/demo/index")),
      icon: UserOutlined,
      children: [
        {
          path: "/console/demo/hook-modal",
          name: "hook-modal",
          component: React.lazy(() => import("@/views/demo/hook-modal/index")),
          icon: UserOutlined,
        },
        {
          path: "/console/demo/hook-log",
          name: "hook-log",
          component: React.lazy(() => import("@/views/demo/hook-log")),
          icon: UserOutlined,
        },
        {
          path: "/console/demo/vs-version",
          name: "vs-version",
          component: React.lazy(() => import("@/views/demo/vs-version/index")),
          icon: UserOutlined,
        },
      ],
    },
    // {
    //   path: "/console/nested",
    //   name: "嵌套",
    //   component: react.lazy(() => import("@/views/nested/index")),
    //   icon: UserOutlined,
    //   children: [
    //     {
    //       path: "/console/nested/nested-1",
    //       name: "嵌套-1",
    //       component: react.lazy(() => import("@/views/nested/nested-1")),
    //       icon: UserOutlined,
    //     },
    //     {
    //       path: "/console/nested/nested-2",
    //       name: "嵌套-2",
    //       component: react.lazy(async () => {
    //         await sleep();
    //         return import("@/views/nested/nested-2");
    //       }),
    //       icon: UserOutlined,
    //     },
    //   ],
    // },
    {
      path: "/console/auth-manage",
      name: "auth-manage",
      title: "权限管理",
      component: react.lazy(() => import("@/views/auth-manage/index")),
      icon: UserOutlined,
    },
    {
      path: "/console/regular",
      name: "Regular",
      title: "正则",
      component: react.lazy(() => import("@/views/regular/index")),
      icon: UserOutlined,
    },
  ],
};
/**
 * 异步动态响应式路由
 */
export const asyncRoutes: RouteItem[] = [consoleRoute];
export const WhitePathList = syncRoutes.map((item) => item.path);
//
import { createProvider } from "./hooks";
import React from "react";
//asyncRoutes defaultRoute
//[...syncRoutes, ...asyncRoutes, defaultRoute]
//[...syncRoutes,  defaultRoute]
export const Provider = createProvider([...syncRoutes, defaultRoute]);
export { useRoutes, useRoutesAction, useIs404 } from "./hooks";
export { default as RouteView } from "./route-view";
