import { getRoleInfo } from "./roles";
import { resFn } from "./utils";
let index = 2;
interface MockUserItem extends UserItem {
  isShow?: false;
  token: string;
}
const list: MockUserItem[] = [
  { id: 0, username: "superAdmin", roleId: 0, token: "superAdmin", isShow: false },
  { id: 1, username: "common", roleId: 1, token: "common" },
];

export const getUserInfo = (req: any) => {
  const reqBody: ReqDataUserInfo = JSON.parse(req.body);
  const _userInfo = list.filter((item) => item.id == Number(reqBody.id))[0];
  if (!_userInfo) return resFn(401, undefined, "没有数据");
  const _roleInfo = getRoleInfo(_userInfo.roleId);
  const _body: ResDataLogin = {
    ..._userInfo,
    roleName: _roleInfo.roleName,
    authList: [..._roleInfo.checkedKeys, ..._roleInfo.halfCheckedKeys],
  };
  return resFn(_body);
};
export const reqLogin = (req: any) => {
  const reqBody: ReqDataLogin = JSON.parse(req.body);
  const _userInfo = list.filter((item) => item.username == reqBody.username)[0];
  if (!_userInfo) return resFn(401, undefined, "没有数据");
  const _roleInfo = getRoleInfo(_userInfo.roleId);
  const _body: ResDataLogin = {
    ..._userInfo,
    roleName: _roleInfo.roleName,
    authList: [..._roleInfo.checkedKeys, ..._roleInfo.halfCheckedKeys],
  };
  return resFn<ResDataLogin>(_body);
};

export const create = (req: any) => {
  const reqBody: ReqDataUserCreate = JSON.parse(req.body);
  const _roleInfo = getRoleInfo(reqBody.roleId);
  console.log("[reqBody]", reqBody);
  list.push({
    id: index++,
    ...reqBody,
    roleName: _roleInfo.roleName || "",
    token: reqBody.username,
  });
  return resFn();
};
export const getList = () => {
  //req: any
  // const reqBody: ReqDataUserList = JSON.parse(req.body);
  const _list = list.filter((item) => item.isShow !== false);
  return resFn<ResDataUserList>({ list: _list, total: _list.length });
};
