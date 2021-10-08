import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useIs404 } from "./hooks";
import { useUser } from "@/store/user";
import NProgress from "nprogress";
import { appNotificationFn } from "@/plugins/antd";

interface Props {
  to: RouteItem;
  // from: RouteItem;
}
const whitelist = ["/", "/home", "/404", "/login"];
const RouteBefore: React.FC<ViewProps<Props>> = (props) => {
  const { to } = props;
  console.log("[to]", to);

  NProgress.start();
  /**1.直接进入的 */
  useEffect(() => {
    //如果是白名单 并且有组件直接显示页面
    if (whitelist.includes(to.path) && to.component) {
      NProgress.done();
    }
  }, []);

  /**2.跳转登录页面 */
  const { isLogin } = useUser();
  const history = useHistory();
  //路由不在摆明单并且没有登录  或者 重定向路径不在白名单并且没有登录
  const isToLogin =
    (!whitelist.includes(to.path) && !isLogin) || (to.redirect && !whitelist.includes(to.redirect) && !isLogin);
  useEffect(() => {
    if (!is404 && isToLogin) {
      appNotificationFn.warn({ message: "请登录！" });
      NProgress.done();
      history.push("/login");
    }
  }, []);
  /**3.404 */
  const { is404 } = useIs404();

  //根据条件 返回视图层
  if (to.redirect && whitelist.includes(to.redirect)) return <Redirect to={{ pathname: to.redirect }} />;
  if (!to.component || isToLogin) return <></>;
  // console.log("[is404]", is404);
  if (is404) return <Redirect to={{ pathname: "/404" }} />;

  //render
  return <to.component {...props} />;
};
export default RouteBefore;
