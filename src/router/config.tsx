import React from 'react';
import ConsoleLayout from '@/components/console-layout';
import { UserOutlined } from '@ant-design/icons';
import Login from '@/views/login/index';
import Home from '@/views/home';
import Page404 from '@/views/404';
import { Outlet } from 'react-router-dom';

export const consoleRoute: RouteItem = {
  path: '/console',
  title: '控制台',
  component: ConsoleLayout,
  isAuth: true, //子类默认是
  children: [
    {
      icon: UserOutlined,
      component: React.lazy(async () => import('@/views/dashboard')),
      index: true,
    },
    {
      path: '/console/doing',
      title: 'doing',
      isAuth: false,
      component: React.lazy(async () => import('@/views/doing')),
      // icon: Icons.Run,
    },

    // {
    //   path: '/console/auth-manage',
    //   title: '权限管理',
    //   icon: UserOutlined,
    //   component: () => <Outlet></Outlet>,
    //   children: [
    //     {
    //       path: '/console/auth-manage/role-manage',
    //       title: '角色管理',
    //       icon: UserOutlined,
    //       component: React.lazy(async () => import('@/views/auth-manage/role-manage/list')),
    //     },
    //     {
    //       path: '/console/auth-manage/user-manage',
    //       title: '用户管理',
    //       icon: UserOutlined,
    //       component: React.lazy(async () => import('@/views/auth-manage/user-manage/list')),
    //     },
    //   ],
    // },
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
export const RouteList: RouteItem[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  consoleRoute,
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '*',
    component: Page404,
  },
];
