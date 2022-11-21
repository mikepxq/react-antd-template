import React from 'react';
import ScreenFull from './screen-full';
import Template from './template';
interface Props {
  [key: string]: any;
}

const ToolNav: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  //render
  return (
    <div className={`tool-nav ${className}`}>
      <ScreenFull></ScreenFull>
      <Template></Template>
    </div>
  );
};
export default ToolNav;
