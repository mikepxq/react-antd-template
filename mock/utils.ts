import { MockApiSleepTime } from '@/config';

interface ReqFn {
  <Res>(data?: Res, code?: number, message?: string): {
    code: number;
    data: Res;
    message: string;
  };
}
/** 封装返回 */
export const resFn: ReqFn = (data: any = null, code = 200, message = `mock api ok,times ${MockApiSleepTime}s`) => {
  return {
    code,
    data,
    message,
  };
};
