import React from 'react';
interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const Page404: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  //render
  return <div>404</div>;
};
export default Page404;
