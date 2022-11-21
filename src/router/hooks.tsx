import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RouterBefore from './before';
/** 重构配置
 *
 * @param routeList
 * @param parent
 * @returns
 */
const getRouteTreeList = (routeList: RouteItem[], parent?: RouteItem) => {
  return routeList.map((route) => {
    //1 添加当前路由 到 面包屑路由列表
    route.breadCrumbRouteList = [route];
    // 2. 循环 key
    route._key = route.path;
    if (parent) {
      // route.parent = parent; //2.给子路由绑定父类
      route.breadCrumbRouteList = parent.breadCrumbRouteList?.concat(route.breadCrumbRouteList); //1.1追加父面包屑到子路由面包屑
      // 仅在算法中使用 等级if
      if (route.index) route._key = `${parent._key}/index`; // 2.1 循环 key
    }
    // 3. 是否需要权限判断
    route.isAuth = route.isAuth ?? parent?.isAuth;
    // 4. 添加路由卫士 作为 权限组件
    route.element = <RouterBefore route={route}></RouterBefore>;
    // 5. 如果……,有索引路由
    if (route.index && parent) parent.isHasIndexChildren = true;
    if (route.children) {
      route.children = getRouteTreeList(route.children, route);
    }
    return route;
  });
};
/** 根据路由配置 生成可供 router v6 <Routes> 使用的子元素
 *
 * @param routeList
 * @param parent
 * @returns
 */
const getRouteTreeDom = (routeList: RouteItem[]) => {
  return routeList.map((route) => {
    //route.isLayout ? '' :
    return (
      <Route path={route.path} element={route.element} key={`${route._key}`} index={Boolean(route.index)}>
        {route.children && getRouteTreeDom(route.children)}
      </Route>
    );
  });
};
/**路由映射
 * [path]:[route]方便查询
 * @param routeList
 * @param map
 * @returns
 */
const getRoutesMap = (routeList: RouteItem[], map: Record<string, RouteItem> = {}) => {
  routeList.forEach((route) => {
    if (route.children) {
      getRoutesMap(route.children, map);
    }
    map[route.path as string] = route;
  });
  return map;
};
/*============================================== */
/** 1.上下文 */
type TypeRouteListContext = { routeList: RouteItem[]; routesMap: Record<string, RouteItem> };
const RouteListContext = React.createContext<TypeRouteListContext>({ routeList: [], routesMap: {} });
// const SetRoutesContext = React.createContext({});

/** 2.封装 BrowserRouter */
export const createProvider = (routeOptionList: RouteItem[] = []) => {
  //2.上下文挂值
  const Provider: React.FC<any> = (props) => {
    const [routeList] = useState<RouteItem[]>(getRouteTreeList(routeOptionList));
    const [routesMap] = useState<Record<string, RouteItem>>(getRoutesMap(routeList));

    return (
      // https://reactrouter.com/docs/en/v6/api#hashrouter
      //hash router 导致 search params 无法正常解析
      <BrowserRouter>
        <RouteListContext.Provider value={{ routeList, routesMap }}>{props.children}</RouteListContext.Provider>
      </BrowserRouter>
    );
  };
  return Provider;
};

/** 获得重构后的路由 */
export const useRouteListDom = () => {
  const { routeList } = React.useContext(RouteListContext);
  // 全局只用一次
  // eslint-disable-next-line react/display-name
  return () => <Routes>{getRouteTreeDom(routeList)}</Routes>;
};
/** 获得当前路由对象 */
export const useCurrentRoute = (): RouteItem | undefined => {
  const { routesMap } = React.useContext(RouteListContext);
  // 使用原生 避免重复渲染
  const _location = { pathname: location.pathname };
  if (location.hash && /#\//.test(location.hash)) {
    _location.pathname = location.hash.split('#')[1];
  }
  return routesMap[_location.pathname];
};
/** 获得当前路由对象 */
export const useRouteList = () => React.useContext(RouteListContext).routeList;
