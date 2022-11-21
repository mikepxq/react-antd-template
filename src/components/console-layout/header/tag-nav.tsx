import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useCurrentRoute } from '@/router/hooks';
import { useActionsConsoleLayout, useConsoleLayout } from '@/store/console-layout';
interface Props {
  [key: string]: any;
}

const TagNav: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { visitedList } = useConsoleLayout();
  const { setVisitedMap } = useActionsConsoleLayout();
  const currentRoute = useCurrentRoute();
  useEffect(() => {
    if (currentRoute.isShortcutTag === false) return;
    setVisitedMap({ name: currentRoute.name as string, title: currentRoute.title, path: currentRoute.path as string });
  }, [currentRoute]);

  //render
  return (
    <nav className={`tag-nav ${className}`}>
      <Tag className="item" onClick={() => navigate(-1)}>
        <LeftOutlined /> 返回
      </Tag>
      <Tag className="item" onClick={() => navigate('/')}>
        首页
      </Tag>
      {visitedList.map((route, index) => {
        return (
          <Tag
            onClick={() => {
              navigate(route.path);
            }}
            className={`item ${location.pathname == route.path ? 'active' : ''}`}
            key={`${route.path}`}
            closable={index > 0}
            onClose={(e) => {
              e.preventDefault();
              setVisitedMap({ ...route, isDelete: true });
              //如果是最后一个，跳转到上一个
              if (location.pathname == visitedList[visitedList.length - 1].path) {
                return navigate(visitedList[visitedList.length - 2].path); //当前还没删除
              }
              //如果是当前，跳转到最后一个
              if (location.pathname == route.path) {
                navigate(visitedList[visitedList.length - 1].path);
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
