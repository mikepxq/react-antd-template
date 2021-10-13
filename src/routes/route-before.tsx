import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useIs404 } from "./hooks";
import { useUser } from "@/store/user";
import NProgress from "nprogress";
import { appNotificationFn } from "@/plugins/antd";
import { WhitePathList } from "@/routes/index";

interface Props {
  to: RouteItem;
  // from: RouteItem;
}

const RouteBefore: React.FC<ViewProps<Props>> = (props) => {
  const { to } = props;
  useEffect(() => {
    console.log("[to]", to);
    NProgress.start();
  }, [to.path]);

  /**1.直接进入的 */
  useEffect(() => {
    //如果是白名单 并且有组件直接显示页面
    if ((WhitePathList.includes(to.path) && to.component) || (isLogin && to.component)) {
      NProgress.done();
    }
  }, []);

  /**2.跳转登录页面 */
  const { isLogin } = useUser();
  //deving 处理直接访问 权限路由
  useEffect(() => {
    if (isLogin) {
      console.log("[on isLogin]");
    }
  }, [isLogin]);
  const history = useHistory();
  //路由不在摆明单并且没有登录  或者 重定向路径不在白名单并且没有登录
  const isToLogin =
    (!WhitePathList.includes(to.path) && !isLogin) || (to.redirect && !WhitePathList.includes(to.redirect) && !isLogin);
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
  if ((to.redirect && isLogin) || (to.redirect && WhitePathList.includes(to.redirect))) {
    return <Redirect to={{ pathname: to.redirect }} />;
  }
  if (!to.component || isToLogin) return <></>;

  //render
  return <to.component {...props} />;
};
export default RouteBefore;
