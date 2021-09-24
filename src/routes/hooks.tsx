import { cloneDeep } from "lodash";
import React, { useState } from "react";

class ModelRoutes {
  static routeMap: Record<string, RouteItem> = {};
  static routeList: RouteItem[] = [];
  static getBreadCrumbs(route: RouteItem) {
    //如果是有层级的路由
    if (/^\//.test(route.path)) {
      return route.path
        .split("/")
        .slice(1) //第一个是空字符 从第二个开始
        .map((pathNode) => `/${pathNode}`);
    }
    return []; // 比如 *
  }
  static init(routeList: RouteItem[]) {
    ModelRoutes.routeList = ModelRoutes.getRouteTreeList(cloneDeep(routeList));
    return ModelRoutes.routeList;
  }
  static addRouteToMap(route: RouteItem) {
    ModelRoutes.routeMap[route.path] = route;
  }
  /**
   * 获得路由隐射
   * @param routeList 元素路由数据 修改元数据
   * @param routeMap 路径映射路由，方便后期查找
   * @param parent 给子路由绑定父类
   * @returns
   */
  static getRouteTreeList(routeList: RouteItem[], routeTreeList: RouteItem[] = [], parent?: RouteItem) {
    //
    routeList.forEach((route) => {
      route.breadCrumbRoutes = [route]; //1 添加当前路由 到 面包屑路由列表
      route.exact = true; //默认严格匹配
      if (parent) {
        route.parent = parent; //2.给子路由绑定父类
        route.breadCrumbRoutes = parent.breadCrumbRoutes?.concat(route.breadCrumbRoutes); //2.1追加父面包屑到子路由面包屑
      }
      ModelRoutes.addRouteToMap(route); //3.路径映射路由，方便后期查找
      if (route.children) {
        //4.获得重构后的子路由
        route.children = ModelRoutes.getRouteTreeList(route.children, [], route);
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
  }
}

/*******************************外部使用********************************************** */
//1.上下文
const RoutesContext = React.createContext({});
const SetRoutesContext = React.createContext({});

export const createProvider = (initRoutes: RouteItem[] = []) => {
  //2.上下文挂值
  const Provider: React.FC = (props) => {
    ModelRoutes.init(initRoutes);
    const [routeList, _setRoutes] = useState<RouteItem[]>(ModelRoutes.routeList);
    let routeMap: Record<string, RouteItem> = ModelRoutes.routeMap; //不响应式
    const setRoutes = (routeList: RouteItem[]) => {
      ModelRoutes.init(routeList);
      _setRoutes(ModelRoutes.routeList);
      routeMap = ModelRoutes.routeMap;
    };

    return (
      <RoutesContext.Provider value={{ routeList, routeMap }}>
        <SetRoutesContext.Provider value={setRoutes}>{props.children}</SetRoutesContext.Provider>
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

export const useRoutesFn = () => {
  return React.useContext(SetRoutesContext);
};

export const useIs404 = () => {
  const { routeMap } = React.useContext(RoutesContext) as TypeUseRoutes;
  //没有就是404 直接访问子类路由
  return { is404: !routeMap[location.pathname] };
};
export const useGetPathnameRoute = () => {
  const { routeMap } = React.useContext(RoutesContext) as TypeUseRoutes;
  //没有就是404 直接访问子类路由
  return { currentRoute: routeMap[location.pathname] };
};
