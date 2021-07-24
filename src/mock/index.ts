import Mock from "mockjs";

import * as user from "./user";
Mock.mock("/mock/api/user/info", "post", user.getUserInfo);
