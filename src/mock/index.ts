import Mock from "mockjs";

import * as user from "./user";
import * as Roles from "./roles";

Mock.mock("/mock/api/user/info", "post", user.getUserInfo);
Mock.mock("/mock/api/user/login", "post", user.reqLogin);
//
Mock.mock("/mock/api/role/list", "post", Roles.getList);
Mock.mock("/mock/api/role/create", "post", Roles.roleCreate);
