import { RouterHistory } from "@/router";
import { useUser } from "@/store/user";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
  [key: string]: any;
}
interface ListItem {
  title: string;
  to?: string;
  onclick?: () => void;
}
const list: ListItem[] = [
  // { title: "用户信息" },
  {
    title: "登出",
    onclick: () => {
      //TODO !update store reset
      localStorage.clear();
      RouterHistory.replace("/login");
    },
  },
];

const UserDropdownMenu: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const user = useUser();
  const _Menu = (
    <Menu>
      {list.map((item) => (
        <Menu.Item key={item.title} onClick={item.onclick}>
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
