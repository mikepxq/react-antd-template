import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
const { Sider } = Layout;
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { consoleRoute } from '@/router/config';
import { useUser } from '@/store/user';
import { getKeyListValueTrueInMap } from '@/utils';
import { useCurrentRoute } from '@/router/hooks';
import { getIsOkAuth } from '@/router/utils';

interface Props {
  collapsed: boolean;
  onChange?: (route: RouteItem) => void;
  routes?: RouteItem[]; //侧边路由
  isMultipleOpen?: boolean; //是否可以展开多个
}
const Aside: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed } = props;
  const user = useUser();
  const [openKeysMap, setOpenKeysMap] = useState<Record<string, boolean>>({});
  const [selectedKeyList, setSelectedKeyList] = useState<string[]>([]);
  //路径 面包屑 列表
  const currentRoute = useCurrentRoute();
  useEffect(() => {
    if (!currentRoute || !currentRoute.breadCrumbRouteList) return;
    const _pathList = currentRoute.breadCrumbRouteList.map((route) => route.path || '/');
    setSelectedKeyList(_pathList);
    const _map: Record<string, boolean> = {};
    _pathList.forEach((path) => (_map[path] = openKeysMap[path] ?? true)); //默认当前路由展开
    setOpenKeysMap({ ...openKeysMap, ..._map });
  }, [currentRoute]);

  //
  const [openKeyList, setOpenKeyList] = useState<string[]>();
  useEffect(() => {
    if (collapsed) return setOpenKeyList(undefined); //折叠时使用antd自带交互
    setOpenKeyList(getKeyListValueTrueInMap(openKeysMap)); //回显折叠时候的操作
  }, [collapsed, openKeysMap]);

  const navigate = useNavigate();
  const getSideMenu = (routes: RouteItem[] = []) => {
    return routes
      .filter((route) => {
        //1.未隐藏  2.非索引路由 3.有权限
        return !route.isHidden && !route.index && getIsOkAuth(route, user.authList);
      })
      .map((route) => {
        //1.未隐藏  2.非索引路由 3.有权限
        const hasChildren =
          route.children &&
          route.children.filter((cRoute) => !cRoute.isHidden && !cRoute.index && getIsOkAuth(cRoute, user.authList))
            .length > 0;
        if (hasChildren) {
          return (
            <Menu.SubMenu
              key={route._key}
              icon={route.icon && <route.icon />}
              title={route.title || route.name}
              onTitleClick={() => {
                if (route.isHasIndexChildren) {
                  route.path && navigate(route.path);
                  // if (currentRoute.path != route.path && openKeysMap[String(route.path)]) return;//跳转索引路由时 不自动关闭侧边栏
                }
                setOpenKeysMap({ ...openKeysMap, [route.path as string]: !openKeysMap[route.path as string] });
              }}>
              {getSideMenu(route.children)}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item
            key={route._key}
            icon={route.icon && <route.icon />}
            onClick={() => {
              route.path && navigate(route.path);
            }}>
            {route.title || route.name}
          </Menu.Item>
        );
      });
  };
  //
  /**
   * 获得侧边栏
   */
  const getSideMenuItemList = (routes: RouteItem[] = [], authList: string[] = []): Antd.MenuItemType[] => {
    return routes
      .filter((route) => {
        //1.未隐藏  2.非索引路由 3.有权限
        return !route.isHidden && !route.index && getIsOkAuth(route, authList);
      })
      .map((route) => {
        //1.未隐藏  2.非索引路由 3.有权限
        const hasChildren =
          route.children &&
          route.children.filter((cRoute) => !cRoute.isHidden && !cRoute.index && getIsOkAuth(cRoute, authList)).length >
            0;
        if (hasChildren) {
          return {
            label: route.title || route.name,
            key: route._key as string,
            icon: route.icon && <route.icon />,
            children: getSideMenuItemList(route.children, authList),
          };
        }

        return { label: route.title || route.name, key: route._key as string, icon: route.icon && <route.icon /> };
      });
  };
  const onClick: Antd.MenuClickEventHandler = ({ key }) => {
    /** 非可访问路由，已隐藏侧边栏,并且已用 path 做key */
    navigate(key);
  };
  //render
  return (
    <Sider className="aside" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo"></div>
      <Menu
        className="m-menu"
        items={getSideMenuItemList(consoleRoute.children, user.authList)}
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        openKeys={openKeyList}
        selectedKeys={selectedKeyList}
        onSelect={({ key }) => {
          console.log('[key]', key);
        }}
        onClick={onClick}></Menu>
    </Sider>
  );
};
export default Aside;
