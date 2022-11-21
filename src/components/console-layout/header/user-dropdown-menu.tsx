import { appNotification } from '@/plugins/antd';
import store from '@/store';
import { useUser } from '@/store/user';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TokenName } from '@/config';
interface Props {
  [key: string]: any;
}
interface ListItem {
  title: string;
  to?: string;
  onclick?: (options: { navigate: NavigateFunction }) => void;
}
const list: ListItem[] = [
  // { title: "用户信息" },
  {
    title: '退出',
    onclick: ({ navigate }) => {
      store.dispatch({ type: 'RESET_STORE' });
      localStorage.clear();

      Cookies.remove(TokenName);
      Cookies.remove('userId');
      navigate('/login', { replace: true });
      appNotification.success({ message: '退出成功，请重新登录！' });
    },
  },
];

const UserDropdownMenu: React.FC<ViewProps<Props>> = (props) => {
  const { className = '' } = props;
  const user = useUser();
  const navigate = useNavigate();

  const items: MenuProps['items'] = list.map((item) => ({
    label: item.to ? (
      <Link to={item.to}>{item.title}</Link>
    ) : (
      <a onClick={() => item.onclick && item.onclick({ navigate })}>{item.title}</a>
    ),
    key: item.title,
  }));
  //render
  return (
    <div className={className}>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a>
          用户{user.username} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
export default UserDropdownMenu;
