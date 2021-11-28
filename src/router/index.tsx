import Login from "@/views/login/index";
import Page404 from "@/views/page404";
import ConsoleLayout from "@/console-layout";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { IconExample, IconRun } from "@/icons";
// import { sleep } from "@/utils";
// import Home from "@/views/home";
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
    // component: Home,
    //测试 首屏优化
    component: React.lazy(async () => {
      // await sleep(5);
      return import("@/views/home/index");
    }),
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
  title: "控制台",
  component: ConsoleLayout,
  isAuth: true,
  redirect: "/console/auth-manage",
  children: [
    {
      path: "/console/doing",
      name: "doing",
      isAuth: false,
      component: React.lazy(async () => import("@/views/doing")),
      icon: IconRun,
    },
    {
      path: "/console/demo",
      name: "demo",
      component: React.lazy(() => import("@/views/demo/index")),
      icon: IconExample,
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
      component: React.lazy(() => import("@/views/auth-manage/index")),
      icon: UserOutlined,
      redirect: "/console/auth-manage/role-manage",
      children: [
        {
          path: "/console/auth-manage/role-manage",
          name: "role-manage",
          title: "角色管理",
          component: React.lazy(() => import("@/views/auth-manage/role-manage/index")),
          icon: UserOutlined,
        },
        {
          path: "/console/auth-manage/user-manage",
          name: "UserManage",
          title: "用户管理",
          component: React.lazy(() => import("@/views/auth-manage/user-manage/index")),
          icon: UserOutlined,
        },
      ],
    },
    {
      path: "/console/regular",
      name: "Regular",
      title: "正则",
      component: React.lazy(() => import("@/views/regular/index")),
      icon: UserOutlined,
    },
    {
      path: "/console/article",
      name: "ArticleManage",
      title: "文章管理",
      component: React.lazy(() => import("@/views/article-manage/index")),
      icon: UserOutlined,
      // isLinkBreadCrumb: false, //是否点击是否跳转
      redirect: "/console/article/list",
      children: [
        {
          path: "/console/article/list",
          name: "ArticleList",
          title: "文章列表",
          component: React.lazy(() => import("@/views/article-manage/list")),
          icon: UserOutlined,
        },
        {
          path: "/console/article/create",
          name: "ArticleCreate",
          title: "新建文章",
          component: React.lazy(() => import("@/views/article-manage/create")),
          icon: UserOutlined,
          isHidden: true,
        },
        {
          path: "/console/article/update",
          name: "ArticleUpdate",
          title: "编辑文章",
          component: React.lazy(() => import("@/views/article-manage/update")),
          icon: UserOutlined,
          isHidden: true,
        },
      ],
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

//asyncRoutes defaultRoute
//[..syncRoutes, ..asyncRoutes, defaultRoute]
//[..syncRoutes,  defaultRoute]
export const Provider = createProvider([...syncRoutes, defaultRoute]);
export { useRoutes, useRoutesAction, useIs404 } from "./hooks";
export { default as RouterView } from "./router-view";
import { createBrowserHistory } from "history";
export const RouterHistory = createBrowserHistory();
