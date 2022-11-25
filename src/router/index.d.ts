interface RouteItemHandle {
  isCrumbLink?: boolean; //是否面包屑跳转
  isHidden?: boolean; //是否隐藏侧边栏
  /**子类默认是 */
  isAuth?: boolean; //是否参与权限
  icon?: any;
  title?: string;
}
/**
 * 重定义router 单项
 */
interface RouteItem extends Omit<ReactRouterDom.RouteObject, 'index' | 'children'> {
  children?: RouteItem[];
  index?: any; //规避 createBrowserRouter 爆红
  handle?: RouteItemHandle;
}
type MatchItemType = {
  id: string;
  pathname: string;
  params: ReactRouterDom.Params<string>;
  data: unknown;
  handle: RouteItemHandle;
};

/** 权限选项单选 */
type AuthTreeItem = {
  key: string;
  title?: string;
  children?: AuthTreeItem[];
  isAuth?: boolean; //挂载 透传父类权限
};
