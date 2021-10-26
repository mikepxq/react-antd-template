/**封装处理元素数据 包括静态变量 */
export * from "./auth-tree";
export * from "./config";

/**全局正则 */
export const patternMap = {
  /** mock接口 */
  mockApi: /^\/mock/,
  /** 单字节中文 字母 数字 下划线  多用于名称*/
  alpha_number_: /^[\u4e00-\u9fa5a-zA-Z0-9_]$/,
  appVersion: /^(\d+\.)+\d$/,
};
