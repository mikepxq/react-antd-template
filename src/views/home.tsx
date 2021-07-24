import React from "react";
import logo from "@/assets/logo.svg";
import { useUser, useUserDispatch } from "@/store/user";

const Home: React.FC<ViewsProps> = (props) => {
  const { className } = props;
  const user = useUser();
  const { fetchUserInfo } = useUserDispatch();
  //render
  return (
    <div className={`${className} home__page`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            fetchUserInfo();
          }}>
          获取用户
        </button>
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
