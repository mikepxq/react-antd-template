import { resFn } from "./utils";

const list: AuthManageItem[] = [{ id: 0 }];

export const getList = () => {
  return resFn({ list });
};
