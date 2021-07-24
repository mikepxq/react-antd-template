import React from "react";
import ReactDOM from "react-dom";
import "@/styles/index.less";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import * as Routes from "@/routes/index";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRedux from "react-redux";
import store from "./store";
if (process.env.REACT_APP_MOCK === "true") {
  import("./mock");
}
ReactDOM.render(
  <React.StrictMode>
    <ReactRedux.Provider store={store}>
      <Routes.Provider>
        <Router>
          <App />
        </Router>
      </Routes.Provider>
    </ReactRedux.Provider>
  </React.StrictMode>,
  document.getElementById("app")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
