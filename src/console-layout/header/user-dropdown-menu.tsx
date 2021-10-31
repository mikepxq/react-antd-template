import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
  [key: string]: any;
}
const list = [
  // { title: "用户信息" },
  { title: "登出", to: "/login" },
];

const UserDropdownMenu: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const _Menu = (
    <Menu>
      {list.map((item) => (
        <Menu.Item key={item.title}>{item.to ? <Link to={item.to}>{item.title}</Link> : item.title}</Menu.Item>
      ))}
    </Menu>
  );
  //render
  return (
    <div className={className}>
      <Dropdown overlay={_Menu}>
        <a>
          用户 <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
export default UserDropdownMenu;
