import Mock from "mockjs";

import * as user from "./user";
import * as authManage from "./auth-manage";

Mock.mock("/mock/api/user/info", "post", user.getUserInfo);
//
Mock.mock(/\/mock\/api\/auth-manage\/list/, "get", authManage.getList);
