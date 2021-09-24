// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestGet, requestPost } from "./request";
/** test用get方法获取用户信息 */
/** test用post方法获取用户信息 */
export const reqUserInfo: ApiFn<ReqDataUserInfo, ResDataUserInfo> = (data) => requestPost("/mock/api/user/info", data);
/************************************ 权限管理 ********************************************** */
export const reqAuthManageList: ApiFn<ReqDataAuthManageList, ResAuthManageList> = (data) =>
  requestGet("/mock/api/auth-manage/list", data);
/************************************ 权限管理 end********************************************** */
