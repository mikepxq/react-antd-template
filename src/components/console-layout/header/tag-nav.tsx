import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useActionsConsoleLayout, useConsoleLayout } from '@/store/console-layout';
import styled from 'styled-components';
import { LayoutBoxShadow } from '@/styles/var';
import { useCurrentMatch } from '@/router/hooks';
interface Props {
  [key: string]: any;
}

const TagNav: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { visitedList } = useConsoleLayout();
  const { setVisitedMap } = useActionsConsoleLayout();
  const cRoute = useCurrentMatch();

  useEffect(() => {
    setVisitedMap({ title: cRoute.handle.title, path: cRoute.pathname });
  }, [location.pathname]);

  //render
  return (
    <NavDom className={`tag-nav ${className}`}>
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
            {route.title}
          </Tag>
        );
      })}
    </NavDom>
  );
};
//styles
const NavDom = styled.nav`
  box-shadow: ${LayoutBoxShadow};
  padding: 0 20px;
  height: 30px;
  display: flex;
  align-items: center;
  > .item {
    cursor: pointer;
    user-select: none;
    padding: 0 5px;
    border: 1px solid rgb(212, 207, 207);
    color: #495060;
    display: flex;
    align-items: center;
    height: 20px;
    line-height: 20px;
    &.active {
      background-color: #42b983;
      border-color: #42b983;
      color: #fff;
    }

    .ant-tag-close-icon {
      font-size: 12px;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      margin-left: 3px;
      padding: 2px;
      &:hover {
        background-color: #888;
      }
    }
  }
`;
export default React.memo(TagNav);
