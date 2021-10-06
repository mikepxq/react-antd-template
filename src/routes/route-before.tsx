import React from "react";
import { Redirect } from "react-router-dom";
import { useIs404 } from "./hooks";
import { useUser } from "@/store/user";

interface Props {
  to: RouteItem;
  // from: RouteItem;
}
const whitelist = ["/", "/home", "/404", "/login"];
const RouteBefore: React.FC<ViewProps<Props>> = (props) => {
  const { to } = props;
  console.log("[to]", to);
  //如有有跳转
  if (to.redirect) {
    return <Redirect to={{ pathname: to.redirect }} />;
  }
  //如果是白名单 并且有组件直接显示页面
  if (whitelist.includes(to.path) && to.component) {
    return <to.component {...props} />;
  }

  //如果登录
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLogin } = useUser();
  //如果没登录
  if (!isLogin) return <Redirect to={{ pathname: "/login" }} />;

  //如果是白名单 并且有组件直接显示页面
  if (isLogin && to.component) {
    return <to.component {...props} />;
  }
  //此时没登录

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { is404 } = useIs404();
  if (is404) return <Redirect to={{ pathname: "/404" }} />;

  if (!to.component) return <></>;
  //render
  return <to.component {...props} />;
};
export default RouteBefore;
