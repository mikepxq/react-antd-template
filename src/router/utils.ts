/**获得路由是否通过权限
 *
 * @param authList
 * @param route
 */
export const getIsOkAuth = (route: RouteItem, authList?: string[]) => {
  //无数据，默认无权限
  if (!authList || !route.path) return false;
  // * 超级权限 默认全部通过
  return authList.includes('*') || authList.includes(route.path);
};
/** 通过路由生成权限选项 */
export const generatorAuthTreeOptionFromRoutes = (routes: RouteItem[], parent = {} as AuthTreeItem) => {
  return routes
    .filter((route) => (route.isAuth === undefined ? parent.isAuth : route.isAuth) && !route.index)
    .map((route) => {
      const _map = {
        isAuth: route.isAuth === undefined ? parent.isAuth : route.isAuth, //透传父类权限 ，如果有设置用自己的
        key: route.path,
        title: route.title || route.name || '',
      } as AuthTreeItem;
      if (route.children) {
        _map.children = generatorAuthTreeOptionFromRoutes(route.children, _map);
      }
      return _map;
    });
};
