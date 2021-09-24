import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// import type { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
// Infer the `RootState` and `AppDispatch` types from the store itself
import store from "@/store/index";
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type Dispatch = typeof store.dispatch;

/** 同步| 异步请求 */
export const useAppDispatch = (): Reduxjs.Dispatch => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
