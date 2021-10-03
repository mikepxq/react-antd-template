import { appMessage } from "@/plugins/antd";

const loginFn = (res: ApiRes) => {
  appMessage.error(res.message || "用户失效，请重新登录！");
};
type ErrorFn = (res: ApiRes) => void;
const errorMap: Record<string, ErrorFn> = {
  400: loginFn,
};
export const ErrorMiddleware = (res: ApiRes) => {
  const isError = Object.keys(errorMap).includes(String(res.code));
  if (isError) {
    errorMap[res.code](res);
  }
  return res;
};

export default {};
