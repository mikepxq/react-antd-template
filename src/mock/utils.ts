interface ReqFn {
  <Res>(data?: Res, code?: number, msg?: string): {
    code: number;
    data: Res;
    msg: string;
  };
}
/** 封装返回 */
export const resFn: ReqFn = (data: any = null, code = 200, msg = "ok") => {
  return {
    code,
    data,
    msg,
  };
};
