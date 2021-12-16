import { appNotification } from "@/plugins/antd";
import store from "@/store";
import { useUser } from "@/store/user";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import type { History } from "history";
import Cookies from "js-cookie";
interface Props {
  [key: string]: any;
}
interface ListItem {
  title: string;
  to?: string;
  onclick?: (options: { history: History }) => void;
}
const list: ListItem[] = [
  // { title: "用户信息" },
  {
    title: "退出",
    onclick: ({ history }) => {
      store.dispatch({ type: "RESET_STORE" });
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("userId");
      history.replace({ pathname: "/login" });
      appNotification.success({ message: "退出成功，请重新登录！" });
    },
  },
];

const UserDropdownMenu: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const user = useUser();
  const history = useHistory();
  const _Menu = (
    <Menu>
      {list.map((item) => (
        <Menu.Item key={item.title} onClick={() => item.onclick && item.onclick({ history })}>
          {item.to ? <Link to={item.to}>{item.title}</Link> : item.title}
        </Menu.Item>
      ))}
    </Menu>
  );
  //render
  return (
    <div className={className}>
      <Dropdown overlay={_Menu} trigger={["click"]}>
        <a>
          用户{user.username} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
export default UserDropdownMenu;
