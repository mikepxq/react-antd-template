import React, { useEffect, useState } from "react";
import Nprogress from "nprogress";
import ReactDOM from "react-dom";
interface Props {
  onStart?: () => void;
  onDone?: () => void;
}
const InitLoading: React.FC<ViewProps<Props>> = () => {
  const [isLazyEnd, setIsLazyEnd] = useState(true); //默认同步
  useEffect(() => {
    if (isLazyEnd) return;
    //https://zh-hans.reactjs.org/docs/hooks-reference.html#timing-of-effects
    //isInitEnd 之后处理
    document.getElementById("init")?.classList.remove("initEnd");
  }, [isLazyEnd]);
  useEffect(() => {
    Nprogress.start();
    setIsLazyEnd(false);
    return () => {
      Nprogress.done();
      document.getElementById("init")?.classList.add("initEnd");
    };
  }, []);
  //render
  return ReactDOM.createPortal(
    <div className="init">
      <div className="content">
        <h1>系统准备中……</h1>
        <p>mock api 睡眠时间 1.5s</p>
      </div>
    </div>,
    document.body
  );
};
export default InitLoading;
