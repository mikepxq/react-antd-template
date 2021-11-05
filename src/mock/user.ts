import { getRoleInfo } from "./roles";
import { resFn } from "./utils";

const list = [
  { id: 0, username: "superAdmin", roleName: "superAdmin" as Model.RoleKeys, token: "superAdmin" },
  { id: 1, username: "common", roleName: "common" as Model.RoleKeys, token: "common" },
];

export const getUserInfo = (req: any) => {
  const reqBody: ReqDataUserInfo = JSON.parse(req.body);
  const _userInfo = list.filter((item) => item.id == Number(reqBody.id))[0];
  if (!_userInfo) return resFn(401, undefined, "没有数据");
  const _roleInfo = getRoleInfo(_userInfo.roleName);
  const _body: ResDataLogin = {
    ..._userInfo,
    authList: [..._roleInfo.checkedKeys, ..._roleInfo.halfCheckedKeys],
  };
  return resFn(_body);
};
export const reqLogin = (req: any) => {
  const reqBody: ReqDataLogin = JSON.parse(req.body);
  const _userInfo = list.filter((item) => item.username == reqBody.username)[0];
  if (!_userInfo) return resFn(401, undefined, "没有数据");
  const _roleInfo = getRoleInfo(_userInfo.roleName);
  const _body: ResDataLogin = {
    ..._userInfo,
    authList: [..._roleInfo.checkedKeys, ..._roleInfo.halfCheckedKeys],
  };
  return resFn<ResDataLogin>(_body);
};
