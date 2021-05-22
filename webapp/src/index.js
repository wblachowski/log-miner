import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ErrorDialog from "./components/ErrorDialog";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

import "./index.css";
import Landing from "./components/Landing";
import LogPresenter from "./components/LogPresenter";
import Main from "./views/Main";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
