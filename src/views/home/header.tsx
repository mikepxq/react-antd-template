import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSvg } from "@/icons/svg/logo.svg";
import { Menu } from "antd";
interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const AppHeader: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const getSideMenu = (routes: RouteItem[] = []) => {
    return routes
      .filter((route) => !route.isHidden) //筛选不能显示的
      .map((route) => {
        const hasChildren = route.children;
        if (hasChildren) {
          return (
            <Menu.SubMenu
              key={route.path}
              icon={route.icon && <route.icon />}
              title={route.title || route.name}
              onTitleClick={() => {
                // setOpenKeysMap({ ...openKeysMap, [route.path]: !openKeysMap[route.path] });
                props.onChange && props.onChange(route);
              }}>
              {getSideMenu(route.children)}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item
            key={route.path}
            icon={route.icon && <route.icon />}
            onClick={() => {
              // history.push(route.path);
              props.onChange && props.onChange(route);
            }}>
            {route.title || route.name}
          </Menu.Item>
        );
      });
  };
  //render
  return (
    <header className="app-header">
      <div className="--container">
        <Link to="/">
          <LogoSvg />
          <Menu></Menu>
        </Link>
      </div>
    </header>
  );
};
export default AppHeader;
