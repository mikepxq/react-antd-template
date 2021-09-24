import React from "react";
import { Redirect } from "react-router-dom";
import { useIs404 } from "./hooks";
// import { useUser } from "@/store/user";
interface Props {
  to: RouteItem;
  // from: RouteItem;
}
const RouteBefore: React.FC<ViewProps<Props>> = (props) => {
  const { to } = props;
  const { is404 } = useIs404();
  if (is404) return <Redirect to={{ pathname: "/404" }} />;
  // console.log("[to]", to);
  if (to.redirect) {
    return <Redirect to={{ pathname: to.redirect }} />;
  }
  if (to.component) return <to.component {...props} />;
  //render
  return <></>;
};
export default RouteBefore;
