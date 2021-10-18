// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestGet, requestPost } from "./request";
/** test用get方法获取用户信息 */
/** test用post方法获取用户信息 */
export const reqUserInfo: ApiFn<null, ResDataUserInfo> = () => requestGet("/mock/api/user/info");
/************************************ 权限管理 ********************************************** */
export const reqAuthManageList: ApiFn<ReqDataAuthManageList, ResAuthManageList> = (data) =>
  requestGet("/mock/api/auth-manage/list", data);
/************************************ 权限管理 end********************************************** */

/************************************ 用户登录 ********************************************** */
export const reqLogin: ApiFn<ReqDataLogin, ResDataLogin> = (data) => requestPost("/mock/api/user/login", data);
/************************************ 用户登录 end********************************************** */
