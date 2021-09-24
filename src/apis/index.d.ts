/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../store/user.d.ts"/>
/** 页面请求 */
type DispatchFn<Req = any, Res = any> = (payload: string, options?: Req) => ApiRes<Res> | Promise<ApiRes<Res>>;

/** 接口格式 */
type ApiFn<Req = any, Res = any> = (data?: Req) => Promise<ApiRes<Res>>;

/**接口统一响应结构 */
type ApiRes<T = any> = {
  code: number;
  data: T;
  message?: string;
};
interface ApiData {
  [key: string]: number | string | [];
}

/************************************ 全局 ********************************************** */
declare type ReqDataUserInfo = {
  id: string | number;
};
declare type ResDataUserInfo = {
  username: string;
};
interface TableItem {
  sn?: number; //序号
}

/************************************ 全局 end********************************************** */
/************************************ 权限管理 ********************************************** */
type ReqDataAuthManageList = {
  roleName?: string;
};
interface AuthManageItem extends TableItem {
  id: number;
}
/** 获取权限管理列表 响应数据 */
interface ResAuthManageList {
  list: AuthManageItem[];
}
/************************************ 权限管理 end********************************************** */
