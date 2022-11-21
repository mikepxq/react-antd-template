import React, { useEffect } from 'react';
import { useUser, useUserDispatch } from '@/store/user';
import { Button, Space } from 'antd';
import './style.scss';
import { useRouteList } from '@/router/hooks';
import { Link, useNavigate } from 'react-router-dom';
import SvgIcon from '@/components/svg-icon';

const Home: React.FC<ViewProps> = (props) => {
  const { className = '' } = props;
  const routeList = useRouteList();
  const user = useUser();
  const { fetchUserInfo } = useUserDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    //重定向 去后台
    navigate('/console', { replace: true });
  }, []);
  //render
  return (
    <div className={`home-page ${className}`}>
      <header className="App-header">
        <SvgIcon className="App-logo" name="logo"></SvgIcon>
        <h2>接着开发权限管理</h2>
        <Space>
          {routeList
            .filter((r) => r.title)
            .map((route) => {
              return (
                <Link to={route.path || '/'} key={route.path}>
                  {route.title}
                </Link>
              );
            })}
        </Space>
        <Button
          onClick={() => {
            fetchUserInfo({ id: user.id });
          }}>
          获取用户
        </Button>
        <p>username: {user.username}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};
export default Home;
