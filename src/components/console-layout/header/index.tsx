import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import TopNavBreadcrumb from './breadcrumb';
import TagNav from './tag-nav';
import UserDropdownMenu from './user-dropdown-menu';
import styled from 'styled-components';
import { LayoutBoxShadow } from '@/styles/var';

interface Props {
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
}
const ContainerHeader: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed, onChangeCollapsed, className = '' } = props;
  //render
  return (
    <HeaderDom className={` ${className}`}>
      <section className="top-nav">
        <div className="left">
          <MenuFoldOutlined
            className={`icon ${collapsed ? 'collapsed' : ''}`}
            onClick={() => {
              onChangeCollapsed && onChangeCollapsed(!collapsed);
            }}
          />
          <TopNavBreadcrumb></TopNavBreadcrumb>
        </div>
        <div className="right">
          <UserDropdownMenu />
        </div>
      </section>

      <TagNav />
    </HeaderDom>
  );
};
// styles
const HeaderDom = styled('header')`
  .top-nav {
    height: 50px;
    box-shadow: ${LayoutBoxShadow};
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .icon {
        font-size: 20px;
        &.collapsed {
          transform: rotateZ(180deg);
        }
      }
    }
  }
`;
export default ContainerHeader;
