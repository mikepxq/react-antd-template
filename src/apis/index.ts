// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestGet, requestPost } from "./request";
/************************************ 全局 ********************************************** */
/**获取用户信息 */
export const reqUserInfo: ApiFn<ReqDataUserInfo, ResDataUserInfo> = (data) => requestPost("/mock/api/user/info", data);
/**用户登录 */
export const reqLogin: ApiFn<ReqDataLogin, ResDataLogin> = (data) => requestPost("/mock/api/user/login", data);
/************************************ 全局 end********************************************** */

/************************************ 权限管理 ********************************************** */
export const reqAuthManageList: ApiFn<ReqDataAuthManageList, ResAuthManageList> = (data) =>
  requestGet("/mock/api/role/list", data);
export const reqRoleCreate: ApiFn<ReqDataRoleCreate> = (data) => requestPost("/mock/api/role/create", data);
/************************************ 权限管理 end********************************************** */
