import React from 'react';
import styled from 'styled-components';
interface Props {
  [key: string]: any;
}
/**主内容区 可以统一ui 并减少一层dom */
const ContentMain: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  //render
  return <ContentMainDom className={className}>{props.children}</ContentMainDom>;
};
//styles
const ContentMainDom = styled('main')`
  padding: 20px;
  flex-grow: 2;
  overflow-y: auto;
`;
export default ContentMain;
