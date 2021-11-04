interface ReqFn {
  <Res>(data?: Res, code?: number, message?: string): {
    code: number;
    data: Res;
    message: string;
  };
}
/** 封装返回 */
export const resFn: ReqFn = (data: any = null, code = 200, message = "ok") => {
  return {
    code,
    data,
    message,
  };
};
