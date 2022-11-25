import { useAppDispatch, useSelector } from '@/hooks/store';
import { createSlice } from '@reduxjs/toolkit';
type VisitedRouteItem = { path: string; title?: string; isDelete?: boolean };
const initialState = {
  visitedMap: {} as Record<string, VisitedRouteItem>,
};
type State = typeof initialState;

export const slice = createSlice({
  name: 'consoleLayout',
  initialState,
  reducers: {
    _setVisitedMap(state, action: Action<VisitedRouteItem>) {
      return { ...state, visitedMap: { ...state.visitedMap, [action.payload.path]: action.payload } };
    },
    /**减去 */
    _removeVisitedRoute(state: State, action: Action<VisitedRouteItem>) {
      return { ...state, visitedMap: { ...state.visitedMap, [action.payload.path]: action.payload } };
    },
  },
});

export const useConsoleLayout = () => {
  return useSelector(({ consoleLayout }) => {
    return {
      ...consoleLayout,
      /** 筛选出有访问路由对象的列表 */
      get visitedList() {
        return Object.keys(consoleLayout.visitedMap)
          .filter((key) => !consoleLayout.visitedMap[key].isDelete)
          .map((k) => consoleLayout.visitedMap[k]);
      },
    };
  });
};

export const useActionsConsoleLayout = () => {
  const dispatch = useAppDispatch();
  return {
    setVisitedMap(data: VisitedRouteItem) {
      dispatch(slice.actions._setVisitedMap(data));
    },
  };
};

// store 新建使用
export default slice.reducer;
