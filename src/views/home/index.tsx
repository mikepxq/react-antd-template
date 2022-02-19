import React from "react";
import "./style.less";
import AppHeader from "./header/index";
import Doing from "../doing";

const Home: React.FC<ViewProps> = (props) => {
  const { className } = props;
  //render
  return (
    <div className={`${className} home--page`}>
      <AppHeader />
      <main className="main">
        <Doing className="container" />
      </main>
    </div>
  );
};
export default Home;
