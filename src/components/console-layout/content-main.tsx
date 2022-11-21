import React from 'react';
interface Props {
  [key: string]: any;
}
/**主内容区 可以统一ui 并减少一层dom */
const ContentMain: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  //render
  return <main className={`content-main ${className}`}>{props.children}</main>;
};
export default ContentMain;
