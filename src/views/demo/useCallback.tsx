import React, { useEffect, useState } from "react";
interface Props {}
const useStateCallBack = () => {
  let _state: any = undefined;
  const [state, setState] = useState(_state);
  //页面刷新后
  useEffect(() => {
    setState(_state); //诱发上级页面刷新 重新使用当前hook
  }, [_state]);
  const _setState = (value: any) => {
    _state = value;
  };
  return [state, _setState];
};
export default useStateCallBack;
