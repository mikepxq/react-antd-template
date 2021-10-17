import { resFn } from "./utils";
const resDataLogin = { token: "token", username: "mock", role: "superAdmin" as Model.RoleKeys };
const UserInfo = {
  id: 0,
  username: "mock",
  role: "superAdmin" as Model.RoleKeys,
  authList: ["/console"],
};

export const getUserInfo = () => {
  return resFn(UserInfo);
};
export const reqLogin = () => {
  return resFn<ResDataLogin>({ ...UserInfo, ...resDataLogin });
};
