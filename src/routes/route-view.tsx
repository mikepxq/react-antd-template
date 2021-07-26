import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import RouteBefore from "./route-before";
interface Props {
  routes: RouteItem[];
  className?: string;
}
const RouteView: React.FC<Props> = (props) => {
  const { routes } = props;
  const location = useLocation();
  console.log("[location ]", location);
  //render
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          exact={route.exact}
          key={`route-${index}`}
          render={() => <RouteBefore to={route} className={props.className} />}></Route>
      ))}
    </Switch>
  );
};
export default RouteView;
