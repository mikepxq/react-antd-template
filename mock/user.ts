import { resFn } from './utils';
export const getUserInfo = () => {
  return resFn<ResDataLogin>({
    username: 'test',
    roleName: 'test',
    authList: ['*'],
    id: 1,
    token: 'authList',
  });
};
export const reqLogin = getUserInfo;
