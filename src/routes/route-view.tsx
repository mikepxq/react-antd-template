import React from "react";
import { Switch, Route } from "react-router-dom";
interface Props {
  routes: RouteItem[];
  className?: string;
}
const RouteView: React.FC<Props> = (props) => {
  const { routes } = props;
  //render
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          exact={route.exact}
          key={`route-${index}`}
          render={(rProps) => route.component && <route.component {...rProps} className={props.className} />}></Route>
      ))}
    </Switch>
  );
};
export default RouteView;
