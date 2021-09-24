import React, { useEffect } from "react";
import Nprogress from "nprogress";
interface Props {
  [key: string]: any;
}
const LazyLoading: React.FC<ViewProps<Props>> = () => {
  useEffect(() => {
    Nprogress.start();
    return () => {
      Nprogress.done();
    };
  }, []);
  //render
  return <></>;
};
export default LazyLoading;
