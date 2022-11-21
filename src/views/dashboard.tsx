import ContentMain from '@/components/console-layout/content-main';
import React from 'react';
interface Props {
  [key: string]: any;
}
/** 默认去除前后空格 */
const Dashboard: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  //render
  return <ContentMain className={`dashboard ${className}`}>dashboard</ContentMain>;
};
export default Dashboard;
