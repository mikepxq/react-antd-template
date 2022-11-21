/** 全局正则 */
export const PatternMap = {
  /** mock接口 */
  mockApi: /^\/mock/,
  /** 单字节中文 字母 数字 下划线  多用于名称*/
  alpha_number_: /^[\u4e00-\u9fa5a-zA-Z0-9_]$/,
  appVersion: /^(\d+\.)+\d+$/,
  /** 按压保存快捷键 */
  saveKeydown: /\bmeta.*-s\b/,
};
