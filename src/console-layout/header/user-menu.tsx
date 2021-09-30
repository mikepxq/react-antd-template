import React from "react";
import { Link } from "react-router-dom";
interface Props {
  [key: string]: any;
}
const UserMenu: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return (
    <div className={className}>
      <Link to="/login">To Login</Link>
      UserMenu
    </div>
  );
};
export default UserMenu;
