import { TokenName } from '@/config';
import { reqLogin, reqUserInfo } from '@/apis';
import { useAppDispatch, useSelector } from '@/hooks/store';
import { getToken } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
type State = {
  username: string;
  authList?: string[];
  token: string;
  id: string;
};
const initialState: State = {
  username: '',
  authList: undefined,
  token: getToken() || '',
  id: Cookies.get('userId') || '',
};

export const slice = createSlice({
  name: 'user',
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

export const userActions = slice.actions;
export const userSlice = slice;
/** hooks 就是运行时 */
export const useUserDispatch = () => {
  const dispatch = useAppDispatch();

  return {
    fetchUserInfo: async (data?: ReqDataUserInfo) => {
      const res = await reqUserInfo(data);
      dispatch(userActions.setUserInfo(res.data));
      //留给页面使用
      return res;
    },
    fetchLogin: async (data: ReqDataLogin) => {
      const res = await reqLogin(data);
      if (res.code != 200) return res; //直接给页面使用

      Cookies.set(TokenName, res.data.token, { expires: 1 / 24 / 2 }); //0.5h
      Cookies.set('userId', String(res.data.id), { expires: 1 / 24 / 2 }); //0.5h
      dispatch(userActions.setUserInfo(res.data));
      return res;
    },
  };
};

// store 新建使用
export default slice.reducer;
