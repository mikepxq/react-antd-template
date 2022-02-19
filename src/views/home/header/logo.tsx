import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSvg } from "@/icons/svg/logo.svg";
interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const Logo: React.FC<ViewProps<Props>> = () => {
  //render
  return (
    <Link to="/" className="logo--wrap">
      <LogoSvg className="logo" />
    </Link>
  );
};
export default Logo;
