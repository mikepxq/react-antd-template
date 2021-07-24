import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
/** 同步| 异步请求 */
export const useAppDispatch = (): Reduxjs.Dispatch => useReduxDispatch<Store.Dispatch>();
export const useSelector: TypedUseSelectorHook<Store.RootState> = useReduxSelector;
