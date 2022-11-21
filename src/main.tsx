import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import App from '@/app';
import './styles/index.scss';
import { ConfigProvider } from 'antd';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import store from './store';
import { BrowserRouterProvider } from './router';
import 'virtual:svg-icons-register'; //引入icons注册脚本
// dayjs.locale('zh-cn');

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      {/* 等待支持react v18 */}
      <StoreProvider store={store}>
        <BrowserRouterProvider>
          <App />
        </BrowserRouterProvider>
      </StoreProvider>
    </ConfigProvider>
    // </React.StrictMode>
  );
}
