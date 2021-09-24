import React from "react";
import ReactDOM from "react-dom";
import "@/styles/index.less";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import * as ReactRedux from "react-redux";
import store from "./store";
import * as Routes from "@/routes/index";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
if (process.env.REACT_APP_MOCK === "true") {
  import("./mock");
}
ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <ReactRedux.Provider store={store}>
      <Routes.Provider>
        <App />
      </Routes.Provider>
    </ReactRedux.Provider>
  </ConfigProvider>,
  // </React.StrictMode>
  document.getElementById("app")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
