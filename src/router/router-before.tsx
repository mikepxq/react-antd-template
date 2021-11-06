import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useIs404 } from "./hooks";
import { useUser } from "@/store/user";
import NProgress from "nprogress";
import { WhitePathList } from "@/router/index";

interface Props {
  to: RouteItem;
  // from: RouteItem;
}

const RouteBefore: React.FC<ViewProps<Props>> = (props) => {
  const { to } = props;
  const history = useHistory();
  const { authList } = useUser();
  const { is404 } = useIs404();
  useEffect(() => {
    // console.log("[to]", to);
    NProgress.start();
    //1.如果有重定向路由
    if (to.redirect) {
      NProgress.done();
      //1.1. 在白名单内 直接重定向
      if (WhitePathList.includes(to.redirect)) return history.replace(to.redirect);
      //1.2.有重定向 并且 已经获取权限数据 仍然没有路由
      if (authList && is404) return history.push("/404");
      //1.3 如果有重定向 并且 没有登录 去登录
      if (!authList) return history.push("/login");
      //1.4
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
