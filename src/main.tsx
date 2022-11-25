import React from 'react';
import ReactDOM from 'react-dom/client';

//router
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import InitApp from './components/init-app';
//store
import { Provider as StoreProvider } from 'react-redux';
import store from './store';
//ui
import { ConfigProvider } from 'antd';
import './styles/index.scss';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
// other
import 'virtual:svg-icons-register'; //引入icons注册脚本

// dayjs.locale('zh-cn');

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>// 忽视执行两次
    <StoreProvider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} fallbackElement={<InitApp></InitApp>}></RouterProvider>
      </ConfigProvider>
    </StoreProvider>
    // </React.StrictMode>
  );
}
