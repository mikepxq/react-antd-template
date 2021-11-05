import { useCurrentRoute } from "@/router/hooks";
import { useActionsConsoleLayout, useConsoleLayout } from "@/store/console-layout";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Tag } from "antd";
interface Props {
  [key: string]: any;
}

const TagNav: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const location = useLocation();
  const history = useHistory();
  const { visitedList } = useConsoleLayout();
  const { setVisitedMap } = useActionsConsoleLayout();
  const { currentRoute } = useCurrentRoute();
  useEffect(() => {
    setVisitedMap({ name: currentRoute.name as string, path: currentRoute.path });
  }, [currentRoute]);
  //render
  return (
    <nav className={`tag-nav ${className}`}>
      <Tag onClick={() => history.push("/")}> 首页</Tag>
      {visitedList.map((route, index) => {
        return (
          <Tag
            onClick={() => {
              history.push(route.path);
            }}
            className={`item ${location.pathname == route.path ? "active" : ""}`}
            key={`${route.path}`}
            closable={index > 0}
            onClose={(e) => {
              e.preventDefault();
              setVisitedMap({ ...route, isDelete: true });
              //如果是最后一个，跳转到上一个
              if (location.pathname == visitedList[visitedList.length - 1].path) {
                return history.push(visitedList[visitedList.length - 2].path); //当前还没删除
              }
              //如果是当前，跳转到最后一个
              if (location.pathname == route.path) {
                history.push(visitedList[visitedList.length - 1].path);
              }
            }}>
            {route.title || route.name}
          </Tag>
        );
      })}
    </nav>
  );
};
export default React.memo(TagNav);
