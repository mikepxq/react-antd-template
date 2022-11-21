import React, { useState } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import screenfull from 'screenfull';
interface Props {
  [key: string]: any;
}

const ScreenFull: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  screenfull.onchange(() => {
    setIsFullscreen(screenfull.isFullscreen);
  });
  //
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  //render
  return (
    <span
      className={`full-screen ${className} `}
      onClick={() => screenfull.toggle(document.getElementById('json-editor') || undefined)}>
      {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </span>
  );
};
export default ScreenFull;
