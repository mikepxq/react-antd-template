import { resFn } from "./utils";
const resDataLogin = { authList: ["/console"] };
const user = {
  username: "mock",
};

export const getUserInfo = () => {
  return resFn(user);
};
export const reqLogin = () => {
  return resFn<ResDataLogin>({ ...user, ...resDataLogin });
};
