import React from "react";
import Logo from "./logo";
import NavMenu from "./nav-menu";
interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const AppHeader: React.FC<ViewProps<Props>> = () => {
  //render
  return (
    <header className="header">
      <nav className="container">
        <Logo />
        <NavMenu />
      </nav>
    </header>
  );
};
export default AppHeader;
