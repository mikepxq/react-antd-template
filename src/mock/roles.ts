import { resFn } from "./utils";
interface RoleItem extends AuthManageItem {
  isShow?: boolean;
}
let listIndex = 2;
const list: RoleItem[] = [
  {
    id: 0,
    roleName: "superAdmin",
    checkedKeys: [],
    halfCheckedKeys: [],
    isShow: false,
  },
  {
    id: 1,
    roleName: "common",
    checkedKeys: [
      "/console/demo",
      "/console/auth-manage",
      "/console/demo/hook-modal",
      "/console/demo/hook-log",
      "/console/demo/vs-version",
      "/console/auth-manage/role-manage",
    ],
    halfCheckedKeys: ["/console"],
  },
];

export const getList = () => {
  const _list = list.filter((item) => item.isShow !== false);
  return resFn({ list: _list });
};
export const roleCreate = (req: any) => {
  const reqBody = JSON.parse(req.body);

  list.push({ ...reqBody, id: listIndex++ });
  return resFn();
};
/** 获取用户信息 */
export const getRoleInfo = (roleName: string) => {
  return list.filter((item) => item.roleName === roleName)[0] || { halfCheckedKeys: [], checkedKeys: [] };
};
