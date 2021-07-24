import { resFn } from "./utils";
const user = {
  username: "mock",
};

export const getUserInfo = () => {
  return resFn(user);
};
