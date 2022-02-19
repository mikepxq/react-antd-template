import React from "react";
import { useUser, useUserDispatch } from "@/store/user";
import { Button, Space } from "antd";
import "./style.less";
import { useRoutes } from "@/router";
import AppHeader from "./header";

const Home: React.FC<ViewProps> = (props) => {
  const { className } = props;
  const { routeList } = useRoutes();
  const user = useUser();
  const { fetchUserInfo } = useUserDispatch();
  //render
  return (
    <div className={`${className} home__page`}>
      <AppHeader />
    </div>
  );
};
export default Home;
