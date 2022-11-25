import React from 'react';
import { useUser, useUserDispatch } from '@/store/user';
import { Button, Space } from 'antd';

import SvgIcon from '@/components/svg-icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home: React.FC<ViewProps> = (props) => {
  const { className = '' } = props;

  const user = useUser();
  const { fetchUserInfo } = useUserDispatch();

  //render
  return (
    <HomePage className={`home-page ${className}`}>
      <header className="App-header">
        <SvgIcon className="App-logo" name="logo"></SvgIcon>
        <h2>接着开发权限管理</h2>
        <Space>
          <Link to="/console">
            <Button>控制台</Button>
          </Link>
        </Space>
        <div className="user-box">
          <Button
            onClick={() => {
              fetchUserInfo({ id: user.id });
            }}>
            获取用户
          </Button>
          <p>username: {user.username}</p>
        </div>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </HomePage>
  );
};
//style
const HomePage = styled.div`
  text-align: center;
  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .user-box {
    margin-top: 10px;
  }
`;
export default Home;
