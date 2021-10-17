import { reqLogin, reqUserInfo } from "@/apis";
import { asyncRoutes } from "@/routes";
import { generatorAuthRouteList } from "@/routes/utils";
import { useAppDispatch, useSelector } from "@/store-hooks";
import { createSlice } from "@reduxjs/toolkit";
type State = {
  username: string;
  authList?: string[];
  token: string;
};
const initialState: State = {
  username: "",
  authList: undefined,
  token: localStorage.getItem("token") || "",
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, { payload }: Action<{ username?: string; token?: string; authList?: string[] }>): State {
      return { ...state, ...payload };
    },
  },
});

export const useUser = (): State => {
  return useSelector((state) => state.user);
};

export const actions = slice.actions;
/** hooks 就是运行时 */
export const useUserDispatch = () => {
  const dispatch = useAppDispatch();
  return {
    fetchUserInfo: async (data = { id: 0 }) => {
      const res = await reqUserInfo(data);
      if (res.code == 200) {
        dispatch(slice.actions.setUserInfo(res.data));
      }
      //留给页面使用
      return res;
    },
    fetchLogin: async (data: ReqDataLogin) => {
      const res = await reqLogin(data);
      if (res.code != 200) return res; //直接给页面使用
      localStorage.setItem("token", res.data.token);

      const resUserInfo = await reqUserInfo({ id: res.data.id });
      if (resUserInfo.code != 200) {
        dispatch(slice.actions.setUserInfo({ authList: [] })); //[] 不可访问任何权限路由
        return resUserInfo;
      }
      generatorAuthRouteList(resUserInfo.data, asyncRoutes);

      dispatch(slice.actions.setUserInfo({ authList: resUserInfo.data.authList }));
      return resUserInfo;
    },
  };
};

// store 新建使用
export default slice.reducer;
