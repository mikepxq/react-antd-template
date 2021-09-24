import React from "react";
import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { UploadOutlined } from "@ant-design/icons";
import "./style.less";
import { useHistory } from "react-router-dom";
import { useGetPathnameRoute } from "@/routes/hooks";
import { useActionsConsoleLayout } from "@/store/console-layout";

interface Props {
  collapsed: boolean;
  onChange?: (route: RouteItem) => void;
  routes?: RouteItem[]; //侧边路由
  isMultipleOpen?: boolean; //是否可以展开多个
}
const Aside: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed, routes = [] } = props;
  // //路径 面包屑 列表
  const { currentRoute } = useGetPathnameRoute();
  const breadCrumbRoutePathList = currentRoute.breadCrumbRoutes?.map((route) => route.path);

  const history = useHistory();
  const { setVisitedMap } = useActionsConsoleLayout();
  const getSideMenu = (routes: RouteItem[] = []) => {
    return routes
      .filter((route) => !route.isHidden) //筛选不能显示的
      .map((route) => {
        const hasChildren = route.children;
        if (hasChildren) {
          return (
            <Menu.SubMenu
              key={route.path}
              icon={<UploadOutlined />}
              title={route.name}
              onTitleClick={() => {
                props.onChange && props.onChange(route);
              }}>
              {getSideMenu(route.children)}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item
            key={route.path}
            icon={<UploadOutlined />}
            onClick={() => {
              setVisitedMap({ path: route.path, name: route.name as string });
              history.push(route.path);
              props.onChange && props.onChange(route);
            }}>
            {route.name}
          </Menu.Item>
        );
      });
  };
  //render
  return (
    <Sider className="aside" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo"></div>
      <Menu
        className="m-menu"
        theme="dark"
        mode="inline"
        defaultOpenKeys={breadCrumbRoutePathList}
        defaultSelectedKeys={breadCrumbRoutePathList}>
        {getSideMenu(routes)}
      </Menu>
    </Sider>
  );
};
export default React.memo(Aside);
