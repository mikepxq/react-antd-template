import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "@/styles/index.less";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import * as ReactRedux from "react-redux";
import store from "./store";
import * as Routes from "@/router/index";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { initSvgIcons } from "./icons";
initSvgIcons();

/**模拟直接访问，获取初始全局数据 */
const MockEnter: React.FC = () => {
  const [mockEnd, setMockEnd] = useState(false);
  useEffect(() => {
    import("./mock").then(() => setMockEnd(true));
  }, []);
  return <>{mockEnd && <App />}</>;
};
ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <ReactRedux.Provider store={store}>
      <Routes.Provider>{process.env.REACT_APP_MOCK === "true" ? <MockEnter /> : <App />}</Routes.Provider>
    </ReactRedux.Provider>
  </ConfigProvider>,
  // </React.StrictMode>
  document.getElementById("app")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
