import { cloneDeep } from "lodash";
/**
 * 递归筛选路由
 * @param authList
 * @param routeList
 * @param _RouteList
 * @returns
 */
const filterRouteList = (authList: string[], routeList: RouteItem[]) => {
  return routeList.filter((route) => {
    if (!authList.includes(route.path)) return false;
    if (route.children) route.children = filterRouteList(authList, route.children);
    return true;
  });
};
/**
 * 生成权限路由
 * @param userInfo
 * @param authList
 */
export const generatorAuthRouteList = (userInfo: ResDataUserInfo, routeList: RouteItem[]) => {
  if (userInfo.roleName == "superAdmin") return cloneDeep(routeList);
  if (!userInfo.authList[0]) return [];
  return filterRouteList(userInfo.authList, cloneDeep(routeList));
};
