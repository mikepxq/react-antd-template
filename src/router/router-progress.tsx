import nProgress from 'nprogress';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'nprogress/nprogress.css';
import { createGlobalStyle } from 'styled-components';
/** 模块 */
const RouterNprogress: React.FC<ViewProps> = (props) => {
  const location = useLocation();

  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
    };
  }, [location.pathname]);
  //render
  return (
    <>
      <GlobalStyle></GlobalStyle>
      {props.children}
    </>
  );
};
const GlobalStyle: any = createGlobalStyle`
#nprogress{
 .spinner{
  display: none;
 }
}`;

export default RouterNprogress;
