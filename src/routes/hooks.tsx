import { cloneDeep } from "lodash";
import React, { useState } from "react";
import RouteView from "./route-view";

/**
 * 重构路由
 * @param routeList 元素路由数据 修改元数据
 * @param parent 给子路由绑定父类
 * @returns
 */
/**
 * 重构路由
 * @param routeList  元素路由数据 修改元数据
 * @param routeTreeList 保存路由树状结构
 * @param parent 给子路由绑定父类
 * @returns
 */
const getRouteTreeList = (routeList: RouteItem[], routeTreeList: RouteItem[] = [], parent?: RouteItem) => {
  //
  routeList.forEach((route) => {
    route.breadCrumbRoutes = [route]; //1 添加当前路由 到 面包屑路由列表
    route.exact = true; //默认严格匹配
    if (parent) {
      route.parent = parent; //2.给子路由绑定父类
      route.breadCrumbRoutes = parent.breadCrumbRoutes?.concat(route.breadCrumbRoutes); //2.1追加父面包屑到子路由面包屑
    }
    if (route.children) {
      route.component = route.component || RouteView; //如果没有组件就透传
      //4.获得重构后的子路由
      route.children = getRouteTreeList(route.children, [], route);
      routeTreeList.push(route); //5.添加到要返回的变量中
      return routeTreeList.push({
        ...route,
        exact: false,
        isHidden: true,
        redirect: undefined,
        isAuth: false,
        path: `${route.path}/:content`,
        name: `${route.name}-content`,
      });
    }
    routeTreeList.push(route); //5.添加到要返回的变量中
  });
  return routeTreeList;
};
/**
 * 路由映射
 * @param routeList
 * @param map
 * @returns
 */
const getRoutesMap = (routeList: RouteItem[], map: Record<string, RouteItem> = {}) => {
  routeList.forEach((route) => {
    if (route.children) {
      getRoutesMap(route.children, map);
    }
    map[route.path] = route;
  });
  return map;
};
const initRoutes = (routeList: RouteItem[]) => {
  const list = getRouteTreeList(cloneDeep(routeList));
  const map = getRoutesMap(list);
  return {
    list,
    map,
  };
};
/*******************************外部使用********************************************** */
//1.上下文
const RoutesContext = React.createContext({});
const SetRoutesContext = React.createContext({});

export const createProvider = (routeOptionList: RouteItem[] = []) => {
  //2.上下文挂值
  const Provider: React.FC = (props) => {
    const { list, map } = initRoutes(routeOptionList);

    const [routeList, _setRoutes] = useState<RouteItem[]>(list);
    const [routeMap, _setRouteMap] = useState<Record<string, RouteItem>>(map);
    const setRoutes = (routeList: RouteItem[]) => {
      const { list, map } = initRoutes(routeList);
      _setRoutes(list);
      _setRouteMap(map);
    };

    return (
      <RoutesContext.Provider value={{ routeList, routeMap }}>
        <SetRoutesContext.Provider value={{ setRoutes }}>{props.children}</SetRoutesContext.Provider>
      </RoutesContext.Provider>
    );
  };
  return Provider;
};
//3.上下文取值
type TypeUseRoutes = { routeList: RouteItem[]; routeMap: Record<string, RouteItem> };
/** 获得重构后的路由 */
export const useRoutes = (): TypeUseRoutes => {
  return React.useContext(RoutesContext) as TypeUseRoutes;
};
type UseRoutesAction = { setRoutes: (routeList: RouteItem[]) => void };
export const useRoutesAction = (): UseRoutesAction => {
  return React.useContext(SetRoutesContext) as UseRoutesAction;
};

export const useIs404 = () => {
  const { routeMap } = React.useContext(RoutesContext) as TypeUseRoutes;
  //没有就是404 直接访问子类路由
  return { is404: !routeMap[location.pathname] };
};
export const useCurrentRoute = () => {
  const { routeMap } = React.useContext(RoutesContext) as TypeUseRoutes;
  //没有就是404 直接访问子类路由
  return { currentRoute: routeMap[location.pathname] };
};
