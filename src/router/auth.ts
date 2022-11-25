import { getIsOkAuth } from './utils';
import { reqUserInfo } from '@/apis';
import { getToken } from '@/utils';
import { LoaderFunctionArgs } from 'react-router-dom';
import store from '@/store';
import { userActions } from '@/store/user';
type AuthLoaderType = {
  data: LoaderFunctionArgs;
  // routeList: RouteItem[];
  // authRouteList: RouteItem[];
};

export type AuthLoaderReturnData = undefined | { redirect?: string };
/**
 * 全局 authLoader; useLoaderData 返回值
 */
export type AuthLoaderData = AuthLoaderReturnData & { sideRouteList?: RouteItem[] };

/**
 * 动态初始权限路由
 * - 仅权限路由使用
 * - [注意！] 并且请不要在父子级中同时使用，否则可能会造成重复请求
 *
 */
export const authLoader = async ({ data }: AuthLoaderType): Promise<AuthLoaderReturnData> => {
  const _location = new URL(data.request.url);
  /**
   * 根路由已经处理：
   * 1.如果无此页面
   * 2.白名单直接加载完成
   */
  //3.如果未登录
  const token = getToken();
  if (!token) return { redirect: '/login' }; //App.tsx 做跳转
  const user = store.getState().user;
  //4.如果已经有权限数据
  if (user.authList) {
    const isOkAuth = getIsOkAuth(_location.pathname, user.authList);
    if (!isOkAuth) return { redirect: '/' }; //后期可以加提示
  } else {
    //4.1剩下就是没权限数据的//正常情况，应保证只请求一次
    const res = await reqUserInfo(); //RouterProvider fallbackElement 生效
    //4.1 如果获取接口失败，没通过接口，跳转首页
    if (res.code != 200) return { redirect: '/' };
    store.dispatch(userActions.setUserInfo(res.data)); //挂载到store
  }
};
