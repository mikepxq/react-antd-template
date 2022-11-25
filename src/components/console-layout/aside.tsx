import { getIsOkAuth } from '@/router/utils';
import { useUser } from '@/store/user';
import { getKeyListValueTrueInMap } from '@/utils';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useMatches, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  collapsed: boolean;
}
/** 模块 */
const Aside: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed } = props;
  const l = useLoaderData();
  const user = useUser();
  //侧边是否显示
  const getIsShowAside = (route: RouteItem) => {
    //1.未隐藏  2.非索引路由 3.有权限
    return !route.handle?.isHidden && !route.index && getIsOkAuth(route.path, user.authList);
  };
  //获得侧边栏
  const getSideMenuItemList = (routes: RouteItem[] = []): Antd.MenuItemType[] => {
    return routes.filter(getIsShowAside).map((route) => {
      //子类是否有显示的
      const hasChildren = route.children && route.children.filter(getIsShowAside).length > 0;
      if (hasChildren) {
        return {
          label: <div onClick={() => onClickSubmenu(route)}>{route.handle?.title}</div>,
          key: route.path, //path作key
          children: getSideMenuItemList(route.children),
        };
      }
      return {
        label: route.handle?.title,
        key: route.path, //path作key
      };
    });
  };
  const navigate = useNavigate();
  const onClick: Antd.MenuClickEventHandler = (e) => {
    console.log('[v]', e);
    //e.key ==path
    if (!e.key) return;
    e.key && navigate(e.key);
    setOpenKeysMap({ ...openKeysMap, [e.key]: !openKeysMap[e.key] });
  };
  //== 响应tag等外部路由更新，展开侧边栏
  const [openKeysMap, setOpenKeysMap] = useState<Record<string, boolean>>({});
  const [selectedKeyList, setSelectedKeyList] = useState<string[]>([]);
  const location = useLocation();
  const matches = useMatches();
  useEffect(() => {
    const _pathList = matches.map((item) => item.pathname);
    setSelectedKeyList(_pathList); //节点
    const _map: Record<string, boolean> = {};
    _pathList.forEach((path) => (_map[path] = openKeysMap[path] ?? true)); //默认当前路由展开
    setOpenKeysMap({ ...openKeysMap, ..._map });
  }, [location]);
  const [openKeyList, setOpenKeyList] = useState<string[]>(); //subMenu
  const onClickSubmenu = (route: RouteItem) => {
    if (!route.path) return;
    setOpenKeysMap({ ...openKeysMap, [route.path]: !openKeysMap[route.path] });
  };
  useEffect(() => {
    if (collapsed) return setOpenKeyList(undefined); //折叠时使用antd自带交互
    setOpenKeyList(getKeyListValueTrueInMap(openKeysMap)); //回显折叠时候的操作
  }, [collapsed, openKeysMap]);
  //render
  return (
    <AsideLayout collapsible collapsed={collapsed} trigger={null}>
      <Menu
        className="menu"
        items={getSideMenuItemList(l.sideRouteList)}
        theme="dark"
        mode="inline"
        openKeys={openKeyList}
        selectedKeys={selectedKeyList}
        onClick={onClick}></Menu>
    </AsideLayout>
  );
};
//style
const AsideLayout = styled(Sider)`
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;
export default Aside;
