import React from "react";
import logo from "@/assets/logo.svg";
import { useUser, useUserDispatch } from "@/store/user";
import { Button, Space } from "antd";
import "./style.less";
import { useRoutes } from "@/routes";
import { Link } from "react-router-dom";

const Home: React.FC<ViewsProps> = (props) => {
  const { className } = props;
  const { routes } = useRoutes();
  const user = useUser();
  const { fetchUserInfo } = useUserDispatch();
  //render
  return (
    <div className={`${className} home__page`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>接着开发权限管理</h2>
        <Space>
          {routes.map((route) => {
            return (
              <Link to={route.path} key={route.path}>
                {route.name}
              </Link>
            );
          })}
        </Space>
        <Button
          onClick={() => {
            fetchUserInfo();
          }}>
          获取用户
        </Button>
        <p>username: {user.username}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};
export default Home;
