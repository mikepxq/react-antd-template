import React from "react";
import { Switch, Route } from "react-router-dom";
import RouteBefore from "./router-before";
interface Props {
  routes?: RouteItem[];
  to?: RouteItem;
  className?: string;
}
const RouterView: React.FC<Props> = (props) => {
  let { routes } = props;
  //兼容语法 两者传一
  routes = routes || props.to?.children || [];
  //render
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          exact={route.exact}
          key={`route-${index}`}
          // bug 能出来，但是报错 嵌套404有问题
          render={() => <RouteBefore to={route} className={props.className} />}></Route>
      ))}
    </Switch>
  );
};
export default RouterView;
