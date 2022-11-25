import React from 'react';
import styled from 'styled-components';

interface Props {
  [key: string]: any;
}
/** 模块 */
const InitApp: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  //render
  return (
    <Wrap className={` ${className}`}>
      <div className="content">
        <h2>系统准备中……</h2>
      </div>
    </Wrap>
  );
};
//style
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background: #282c34;
  z-index: 100;
  padding-top: 200px;
  overflow: hidden;
  line-height: 1.5;
  font-family: auto;
  opacity: 1;
  transition: opacity 0.5s;
  word-wrap: normal;
  .content {
    width: 500px;
    margin: 0 auto;
    * {
      margin: 0;
    }
  }
  //加载完成
  &.initEnd {
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -100;
    padding-top: 0;
    transition: 0.5s;
  }
`;
export default InitApp;
