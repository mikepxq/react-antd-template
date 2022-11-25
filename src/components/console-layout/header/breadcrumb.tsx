import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useBreadCrumbList } from '@/router/hooks';
import styled from 'styled-components';

interface Props {
  [key: string]: any;
}
const TopNavBreadcrumb: React.FC<ViewProps<Props>> = () => {
  const [list] = useBreadCrumbList();
  //render
  return (
    <BreadcrumbDom className="bread-crumbs">
      {list.map((item, index) => {
        return (
          <Breadcrumb.Item key={`${item.path}-${index}`}>
            {/* 第一个 或者 最后一个 */}
            {index > list.length - 2 || !item.isCrumbLink ? (
              item.title
            ) : (
              <Link className="link" to={item.path as string}>
                {item.title}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </BreadcrumbDom>
  );
};
// style
const BreadcrumbDom = styled(Breadcrumb)`
  margin-left: 10px;
  [class*='ant-breadcrumb'] {
    vertical-align: middle;
  }
  .link {
    &:hover {
      color: #1677ff;
    }
  }
`;
export default TopNavBreadcrumb;
