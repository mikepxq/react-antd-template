import { MockMethod } from 'vite-plugin-mock';
import * as user from './user';

export default [
  //user
  { url: '/mock/api/user/info', method: 'post', response: user.getUserInfo },
  { url: '/mock/api/user/login', method: 'post', response: user.reqLogin },
] as MockMethod[];
