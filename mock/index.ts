import { basename } from '@/config';
import { MockMethod } from 'vite-plugin-mock';
import * as user from './user';

const mockResList = [
  //user
  { url: 'mock/api/user/info', method: 'post', response: user.getUserInfo },
  { url: 'mock/api/user/login', method: 'post', response: user.reqLogin },
].map((item) => {
  item.url = `${basename}${item.url}`;
  return item;
}) as MockMethod[];
export default mockResList;
