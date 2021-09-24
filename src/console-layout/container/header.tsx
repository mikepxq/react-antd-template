import React from "react";
import TagNav from "./tag-nav";
import TopNav, { TopNavProps } from "./top-nav";

interface Props extends TopNavProps {
  [key: string]: any;
}
const ContainerHeader: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return (
    <header className={`header ${className}`}>
      <TopNav {...props}></TopNav>
      <TagNav />
    </header>
  );
};
export default ContainerHeader;
