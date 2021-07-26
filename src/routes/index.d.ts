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
}
