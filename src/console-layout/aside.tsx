import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
const { Sider } = Layout;
import "./style.less";
import { useHistory } from "react-router-dom";
import { useCurrentRoute } from "@/router/hooks";
import { getKeyListValueTrueInMap } from "@/utils";

interface Props {
  collapsed: boolean;
  onChange?: (route: RouteItem) => void;
  routes?: RouteItem[]; //侧边路由
  isMultipleOpen?: boolean; //是否可以展开多个
}
const Aside: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed, routes = [] } = props;
  //路径 面包屑 列表
  const { currentRoute } = useCurrentRoute();
  const [openKeysMap, setOpenKeysMap] = useState<Record<string, boolean>>({});
  const [selectedKeyList, setSelectedKeyList] = useState<string[]>([]);
  //
  useEffect(() => {
    if (!currentRoute.breadCrumbRoutes) return;
    const _pathList = currentRoute.breadCrumbRoutes.map((route) => route.path);
    setSelectedKeyList(_pathList);
    const _map: Record<string, boolean> = {};
    _pathList.forEach((path) => (_map[path] = true)); //默认当前路由展开
    setOpenKeysMap({ ...openKeysMap, ..._map });
  }, [currentRoute]);
  //
  const [openKeyList, setOpenKeyList] = useState<string[]>();
  useEffect(() => {
    if (collapsed) return setOpenKeyList(undefined); //折叠时使用antd自带交互
    setOpenKeyList(getKeyListValueTrueInMap(openKeysMap)); //回显折叠是的操作
  }, [collapsed, openKeysMap]);
  const history = useHistory();
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
                setOpenKeysMap({ ...openKeysMap, [route.path]: !openKeysMap[route.path] });
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
              history.push(route.path);
              props.onChange && props.onChange(route);
            }}>
            {route.title || route.name}
          </Menu.Item>
        );
      });
  };
  //render
  return (
    <Sider className="aside" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo"></div>
      <Menu className="m-menu" theme="dark" mode="inline" openKeys={openKeyList} selectedKeys={selectedKeyList}>
        {getSideMenu(routes)}
      </Menu>
    </Sider>
  );
};
export default React.memo(Aside);
