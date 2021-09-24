type AuthTreeItem = {
  key: string;
  title?: string;
  children?: AuthTreeItem[];
  isAuth?: boolean; //挂载 透传父类权限
};
/** 通过路由生成权限选项 */
export const generatorAuthTreeOptionFromRoutes = (routes: RouteItem[], parent = {} as AuthTreeItem) => {
  return routes
    .filter((route) => (route.isAuth === undefined ? parent.isAuth : route.isAuth))
    .map((route) => {
      const _map = {
        isAuth: route.isAuth === undefined ? parent.isAuth : route.isAuth, //透传父类权限 ，如果有设置用自己的
      } as AuthTreeItem;
      if (route.children) {
        _map.children = generatorAuthTreeOptionFromRoutes(route.children, _map);
      }
      return {
        ..._map,
        key: route.path,
        title: route.name,
      };
    });
};
