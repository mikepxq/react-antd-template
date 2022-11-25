/**获得路由是否通过权限
 *
 * @param authList
 * @param route
 */
export const getIsOkAuth = (routeName?: string, authList?: string[]) => {
  //无数据，默认无权限
  if (!authList || !routeName) return false;
  // * 超级权限 默认全部通过
  return authList.includes('*') || authList.includes(routeName);
};

/** 通过路由生成权限选项 */
export const generatorAuthTreeOptionFromRoutes = (routes: RouteItem[], parent = {} as AuthTreeItem) => {
  return routes
    .filter((route) => (route.handle?.isAuth === undefined ? parent.isAuth : route.handle.isAuth) && !route.index)
    .map((route) => {
      const _map = {
        isAuth: route.handle?.isAuth === undefined ? parent.isAuth : route.handle?.isAuth, //透传父类权限 ，如果有设置用自己的
        key: route.path,
        title: route.handle?.title,
      } as AuthTreeItem;
      if (route.children) {
        _map.children = generatorAuthTreeOptionFromRoutes(route.children, _map);
      }
      return _map;
    });
};
