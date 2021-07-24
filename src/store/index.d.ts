//tsconfig.json 配置全局使用 默认全局提示
import store from "./index";
// import type { ValidateSliceCaseReducers } from "@reduxjs/toolkit";
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type Dispatch = typeof store.dispatch;
export type R = Reduxjs.SliceCaseReducers;
export as namespace Store;
