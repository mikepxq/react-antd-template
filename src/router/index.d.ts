interface RouteProps {
  [key: string]: any;
  readonly $$typeof?: symbol;
  routes?: RouteItem[];
  className?: string;
}
type RouteItem = ReactRouterDom.RouteObject & {
  //生成数据
  // parent?: RouteItem;
  breadCrumbRouteList?: RouteItem[]; //方便使用
  // isLinkBreadCrumb?: boolean; //是否点击是否跳转
  /**子路径,请使用绝对路径(方便搜索维护) */
  path?: string;
  /** 脚本生成 首选path拼接,如: /console/article. 索引路由是以 name拼接,如:/console/dashboard */
  _key?: string;
  name?: string;
  icon?: any;
  children?: RouteItem[];
  isLayout?: boolean;
  component?: React.FC<RouteProps> | React.LazyExoticComponent<React.FC<any>>;
  /** 是否参与权限选项。如果父路由是true 子类默认是,除非isAuth=false时。 */
  isAuth?: boolean;
  title?: string;
  /** 是否有索引子类 */
  isHasIndexChildren?: boolean;
  /** 是否快捷标签 */
  isShortcutTag?: boolean;
  /** 是否隐藏侧边栏 */
  isHidden?: boolean;
};

type BreadCrumbItem = { path: string; text: string };
/** 权限选项单选 */
type AuthTreeItem = {
  key: string;
  title?: string;
  children?: AuthTreeItem[];
  isAuth?: boolean; //挂载 透传父类权限
};
