// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { requestGet, requestPost } from './request';
/************************************ 全局 ********************************************** */
/** 获取角色选项列表 */
export const reqRoleOptionList: ApiFn<null, OptionItem[]> = () => requestGet('/mock/api/role/option-list');
/************************************ 全局 end ********************************************** */
/************************************ 用户操作 ********************************************** */
/**获取用户信息 */
export const reqUserInfo: ApiFn<ReqDataUserInfo, ResDataUserInfo> = (data) => requestPost('/mock/api/user/info', data);
/**用户登录 */
export const reqLogin: ApiFn<ReqDataLogin, ResDataLogin> = (data) => requestPost('/mock/api/user/login', data);
/************************************ 用户操作 end********************************************** */

/************************************ 权限管理 ********************************************** */
/** 获取角色列表 */
export const reqRoleList: ApiFn<ReqDataRoleList, ResDataRoleList> = (data) => requestPost('/l/api/role/list', data);
/** 新增角色 */
export const reqRoleCreate: ApiFn<ReqDataRoleCreate> = (data) => requestPost('/l/api/role/create', data);
/** 更新角色 */
export const reqRoleUpdate: ApiFn<ReqDataRoleUpdate> = (data) => requestPost('/l/api/role/update', data);
/** 新增用户 */
export const reqUserCreate: ApiFn<ReqDataUserCreate> = (data) => requestPost('/mock/api/user/create', data);
/** 获取用户列表 */
export const reqUserList: ApiFn<ReqDataUserList, ResDataUserList> = (data) => requestPost('/l/api/user/list', data);
/** 更新用户 */
export const reqUserUpdate: ApiFn<ReqDataUserUpdate> = (data) => requestPost('/mock/api/user/update', data);
/************************************ 权限管理 end********************************************** */
/************************************ 文章管理 ********************************************** */
/** 保存文章 */
export const reqArticleSave: ApiFn<ReqDataArticleSave, ResDataArticleCreate> = (data) =>
  requestPost('/l/api/article/save', data);
/** 获取文章列表 */
export const reqArticleList: ApiFn<ReqDataArticleList, ResDataArticleList> = (data) =>
  requestPost('/l/api/article/list', data);
/** 删除文章 */
export const reqArticleDelete: ApiFn<{ id: number }> = (data) => requestPost('/l/api/article/delete', data);
/** 获取文章详细信息 */
export const reqArticleInfo: ApiFn<ReqDataArticleInfo, ResDataArticleInfo> = (data) =>
  requestGet('/l/api/article/info', data);
/************************************ 文章管理 end********************************************** */
