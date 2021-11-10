/**页面组件 */
interface RouteProps {
  [key: string]: Record; //兼容 Route 回调函数 props
  routes?: RouteItem[];
  className?: string;
}

interface RouteItem {
  path: string;
  component?: React.FC<RouteProps>;
  redirect?: string;
  exact?: boolean;
  name?: string;
  children?: RouteItem[];
  //生成数据
  parent?: RouteItem;
  breadCrumbRoutes?: RouteItem[]; //方便使用
  isLinkBreadCrumb?: boolean; //是否点击是否跳转
  icon?: any;
  isAuth?: boolean; //是否参与权限选项。如果父路由是true 子类默认是,除非isAuth=false时。
  isHidden?: boolean; //侧边栏是否隐藏
  title?: string;
}
