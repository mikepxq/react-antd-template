import { MenuFoldOutlined } from '@ant-design/icons';
import React from 'react';
import TagNav from './tag-nav';
import TopNavBreadcrumb from './breadcrumb';
import UserDropdownMenu from './user-dropdown-menu';

interface Props {
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
}
const ContainerHeader: React.FC<ViewProps<Props>> = (props) => {
  const { collapsed, onChangeCollapsed, className = '' } = props;
  //render
  return (
    <header className={`header ${className}`}>
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
    </header>
  );
};
export default ContainerHeader;
