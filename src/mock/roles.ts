import { resFn } from "./utils";
interface MockRoleItem extends RoleItem {
  isShow?: boolean;
}
let listIndex = 2;
const list: MockRoleItem[] = [
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
export const getRoleInfo = (roleId: number) => {
  return list.filter((item) => item.id === roleId)[0] || { halfCheckedKeys: [], checkedKeys: [] };
};

export const getOptionList = () => {
  const _list = list
    .filter((item) => item.isShow !== false)
    .map((item) => ({ text: item.roleName || "", value: item.id }));
  return resFn<OptionItem[]>(_list);
};
