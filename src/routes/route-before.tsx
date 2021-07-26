import React from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "@/store/user";
interface Props {
  to: RouteItem;
  // from: RouteItem;
}
const RouteBefore: React.FC<ViewsProps<Props>> = (props) => {
  const { to } = props;
  const user = useUser();
  console.log("[user]", user); //!deving 用户添加 角色字段
  if (to.redirect) {
    return <Redirect to={{ pathname: to.redirect }} />;
  }
  if (to.component) return <to.component {...props} />;
  //render
  return <></>;
};
export default RouteBefore;
