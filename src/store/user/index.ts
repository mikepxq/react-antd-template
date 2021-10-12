import { reqLogin, reqUserInfo } from "@/apis";
import { useAppDispatch, useSelector } from "@/store-hooks";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  authList: undefined as undefined | string[],
  isLogin: false,
};
type State = typeof initialState;

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, { payload }: Action): State {
      return { ...state, ...payload, isLogin: Boolean(payload.username) };
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
      if (res.code == 200) {
        dispatch(slice.actions.setUserInfo(res.data));
      }
      //留给页面使用
      return res;
    },
  };
};

// store 新建使用
export default slice.reducer;
