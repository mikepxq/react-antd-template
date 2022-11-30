import React from 'react';
import { createBrowserRouter, Outlet, createHashRouter } from 'react-router-dom';
import RouterError from './router-error';
import App from '@/app';
import { authLoader } from './auth';
//
import Page404 from '@/views/404';
import Login from '@/views/login';
const Home = React.lazy(() => import('@/views/home'));
//
const ConsoleLayout = React.lazy(() => import('@/components/console-layout'));
import { sleep } from '@/utils';
import { basename, isGitHub } from '@/config';
//
const Dashboard = React.lazy(() => import('@/views/dashboard'));
const ConsoleDoing = React.lazy(() => import('@/views/doing'));
const RoleManage = React.lazy(() => import('@/views/auth-manage/role-manage/list'));
const UserManage = React.lazy(async () => {
  await sleep();
  return import('@/views/auth-manage/user-manage/list');
});
export const consoleRoute: RouteItem = {
  path: '/console',
  element: <ConsoleLayout></ConsoleLayout>,
  loader: async (data) => {
    const res = await authLoader({ data }).catch(() => ({}));
    return {
      ...res,
      sideRouteList: consoleRoute.children, //当前路由给页面使用
    };
  },
  handle: { title: '控制台', isAuth: true },
  children: [
    {
      // icon: UserOutlined,
      element: <Dashboard></Dashboard>,
      index: true,
    },
    {
      path: '/console/doing',
      element: <ConsoleDoing></ConsoleDoing>,
      handle: { isAuth: false, title: 'doing', iconName: 'icon-run' },

      // icon: Icons.Run,
    },

    {
      path: '/console/auth-manage',
      // icon: UserOutlined,
      element: <Outlet></Outlet>,
      handle: { title: '权限管理', isCrumbLink: false },
      children: [
        {
          path: '/console/auth-manage/role-manage',
          // icon: UserOutlined,
          element: <RoleManage></RoleManage>,
          handle: { title: '角色管理' },
        },
        {
          path: '/console/auth-manage/user-manage',
          // icon: UserOutlined,
          element: <UserManage></UserManage>,
          handle: { title: '用户管理' },
        },
      ],
    },
    // {
    //   path: '/console/article',
    //   title: '文章管理',
    //   icon: UserOutlined,
    //   component: () => <Outlet></Outlet>,
    //   children: [
    //     {
    //       icon: UserOutlined,
    //       component: React.lazy(async () => import('@/views/article/list')),
    //       index: true,
    //     },
    //     {
    //       path: '/console/article/create',
    //       title: '新建文章',
    //       icon: UserOutlined,
    //       component: React.lazy(async () => import('@/views/article/create')),
    //       isHidden: true,
    //     },
    //     {
    //       path: '/console/article/update',
    //       title: '编辑文章',
    //       icon: UserOutlined,
    //       component: React.lazy(async () => import('@/views/article/update')),
    //       isShortcutTag: false,
    //       isHidden: true,
    //     },
    //   ],
    // },
  ],
};
const RouteList: RouteItem[] = [
  {
    path: '/',
    // 全局加载 动态初始
    // loader: async (data) => {},
    element: <App></App>,
    errorElement: <RouterError></RouterError>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/home',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      consoleRoute,
      {
        path: '/404',
        element: <Page404></Page404>,
      },
    ],
  },
];
//
const _createRouteFn = isGitHub ? createHashRouter : createBrowserRouter;
/** 自定义初始路由 */
export const router = _createRouteFn(RouteList);
