/** 封装返回 */
export const resFn = (data: any = null, code = 200, msg = "ok") => {
  return {
    code,
    data,
    msg,
  };
};
