import React from "react";
interface Props {
  [key: string]: any;
}
const UserMenu: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return <div className={className}>deving UserMenu</div>;
};
export default UserMenu;
