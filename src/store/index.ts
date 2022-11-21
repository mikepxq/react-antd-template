import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './user';
import consoleLayout from './console-layout';

//
const appReducers = combineReducers({
  user,
  consoleLayout,
});

const rootReducers = (state: any, action: any) => {
  if (action.type == 'RESET_STORE') {
    state = undefined; //使用默认初始值
  }
  return appReducers(state, action);
};

//
export const store = configureStore({
  reducer: rootReducers,
});

export default store;
