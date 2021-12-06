import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useIs404 } from "./hooks";
import { useUser } from "@/store/user";
import NProgress from "nprogress";

interface Props {
  to: RouteItem;
}

const RouteBefore: React.FC<ViewProps<Props>> = (props) => {
  const { to } = props;
  const history = useHistory();
  const { authList } = useUser();
  const { is404 } = useIs404();
  /**
   * 路由2中异常情况
   * 1.404 登录 或 未登录
   * 2.重定向路由
   */
  useEffect(() => {
    // console.log("[to]", to);
    NProgress.start();
    //1.404
    if (is404) {
      NProgress.done();
      if (!authList) return history.replace({ pathname: "/login" }); //1.1未登录
      return history.replace("/404"); //1.1未登录
    }
    //2.如果有重定向路由
    if (to.redirect) {
      NProgress.done();
      return history.replace(to.redirect);
    }

    NProgress.done();
  }, [to.path]);
  //404 防止渲染节点路由
  if (!to.component || is404) return <></>;

  //render
  return <to.component {...props} />;
};
export default RouteBefore;
