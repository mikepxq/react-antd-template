//deving 验证算法
/**
 * 递归筛选路由
 * @param authList
 * @param routeList
 * @param _RouteList
 * @returns
 */
const filterRouteList = (authList: string[], routeList: RouteItem[], _RouteList: RouteItem[] = []) => {
  routeList.forEach((route) => {
    if (!authList.includes(route.path)) return;
    if (route.children) filterRouteList(authList, routeList, route.children);
    _RouteList.push(route);
  });
  return _RouteList;
};
/**
 * 生成权限路由
 * @param userInfo
 * @param authList
 */
export const generatorAuthRouteList = (userInfo: ResDataUserInfo, routeList: RouteItem[]) => {
  if (userInfo.role == "superAdmin") return routeList;
  if (!userInfo.authList[0]) return [];
  return filterRouteList(userInfo.authList, routeList);
};
