// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestGet, requestPost } from "./request";
/************************************ 全局 ********************************************** */
/** 获取角色选项列表 */
export const reqRoleOptionList: ApiFn<null, OptionItem[]> = () => requestGet("/mock/api/role/option-list");
/************************************ 全局 end ********************************************** */
/************************************ 用户操作 ********************************************** */
/**获取用户信息 */
export const reqUserInfo: ApiFn<ReqDataUserInfo, ResDataUserInfo> = (data) => requestPost("/mock/api/user/info", data);
/**用户登录 */
export const reqLogin: ApiFn<ReqDataLogin, ResDataLogin> = (data) => requestPost("/mock/api/user/login", data);
/************************************ 用户操作 end********************************************** */

/************************************ 权限管理 ********************************************** */
export const reqAuthManageList: ApiFn<ReqDataAuthManageList, ResAuthManageList> = (data) =>
  requestPost("/mock/api/role/list", data);
/** 新增角色 */
export const reqRoleCreate: ApiFn<ReqDataRoleCreate> = (data) => requestPost("/mock/api/role/create", data);
/** 新增用户 */
export const reqUserCreate: ApiFn<ReqDataUserCreate> = (data) => requestPost("/mock/api/user/create", data);
/** 获取用户列表 */
export const reqUserList: ApiFn<ReqDataUserList, ResDataUserList> = (data) => requestPost("/mock/api/user/list", data);
/************************************ 权限管理 end********************************************** */
