import { reqLogin, reqUserInfo } from "@/apis";
import { asyncRoutes, defaultRoute, syncRoutes, useRoutesAction } from "@/router";
import { generatorAuthRouteList } from "@/router/utils";
import { useAppDispatch, useSelector } from "@/store-hooks";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
type State = {
  username: string;
  authList?: string[];
  token: string;
  id: string;
};
const initialState: State = {
  username: "",
  authList: undefined,
  token: Cookies.get("token") || "",
  id: Cookies.get("userId") || "",
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
  const { setRoutes } = useRoutesAction();
  const resetRoutes = (userInfo: ResDataUserInfo) => {
    const authRoutes = generatorAuthRouteList(userInfo, [...asyncRoutes]);
    setRoutes([...syncRoutes, ...authRoutes, defaultRoute]);
  };

  return {
    fetchUserInfo: async (data: ReqDataUserInfo) => {
      const res = await reqUserInfo(data);
      if (res.code != 200) {
        dispatch(slice.actions.setUserInfo({ authList: [] })); //不为undefined说明加载过， [] 不可访问任何权限路由
        return res;
      }
      resetRoutes(res.data);
      dispatch(slice.actions.setUserInfo(res.data));
      //留给页面使用
      return res;
    },
    fetchLogin: async (data: ReqDataLogin) => {
      const res = await reqLogin(data);
      if (res.code != 200) return res; //直接给页面使用
      Cookies.set("token", res.data.token, { expires: 1 / 2 / 24 }); //0.5h
      Cookies.set("userId", String(res.data.id), { expires: 1 / 2 / 24 }); //0.5h
      resetRoutes(res.data);
      dispatch(slice.actions.setUserInfo(res.data));
      return res;
    },
  };
};

// store 新建使用
export default slice.reducer;
