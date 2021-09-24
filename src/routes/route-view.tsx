import React from "react";
import { Switch, Route } from "react-router-dom";
import RouteBefore from "./route-before";
interface Props {
  routes: RouteItem[];
  className?: string;
}
const RouteView: React.FC<Props> = (props) => {
  const { routes } = props;
  // console.log("[location ]", location, m);
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
export default RouteView;
