import React, { useEffect } from "react";
import Nprogress from "nprogress";
interface Props {
  onStart?: () => void;
  onDone?: () => void;
}
const LazyLoading: React.FC<ViewProps<Props>> = (props) => {
  useEffect(() => {
    Nprogress.start();
    props.onStart && props.onStart();
    return () => {
      Nprogress.done();
      props.onDone && props.onDone();
    };
  }, []);
  //render
  return <></>;
};
export default LazyLoading;
