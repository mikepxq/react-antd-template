import React from "react";

import { Menu } from "antd";
import { useHistory } from "react-router-dom";
interface Props {
  [key: string]: any;
}
const NavMenuList: RouteItem[] = [
  {
    path: "/console",
    exact: true,
    title: "console",
  },
];
/** 默认去除前后空格 */
const NavMenu: React.FC<ViewProps<Props>> = (props) => {
  const history = useHistory();
  const getNavMenu = (routes: RouteItem[] = []) => {
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
              {getNavMenu(route.children)}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item
            key={route.path}
            icon={route.icon && <route.icon />}
            onClick={() => {
              history.push(route.path);
            }}>
            {route.title || route.name}
          </Menu.Item>
        );
      });
  };
  //render
  return <Menu>{getNavMenu(NavMenuList)}</Menu>;
};
export default NavMenu;
