import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SwitchComponents from "../components/SwitchComponents";

import { sendLogs } from "../actions/thunks";

import DragAndDrop from "../components/DragAndDrop";
import LogPresenter from "../components/LogPresenter";
import Landing from "../components/Landing";
import ErrorDialog from "../components/ErrorDialog";
import { Container } from "@material-ui/core";
import { startLoading } from "../actions/actionCreators";
import { getLoading } from "../selectors";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "../configureStore";
const hist = createBrowserHistory();
const Dashboard = () => {
  return (
    <>
      <Router history={hist}>
        <Switch>
          <Route path="/result" component={LogPresenter} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
      <ErrorDialog />
    </>
  );
};

export default Dashboard;
