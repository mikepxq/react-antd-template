import React from "react";
import "./style.less";
import AppHeader from "./header/index";

const Home: React.FC<ViewProps> = (props) => {
  const { className } = props;
  //render
  return (
    <div className={`${className} home--page`}>
      <AppHeader />
    </div>
  );
};
export default Home;
