import React from "react";

import LogPresenter from "../components/LogPresenter";
import Landing from "../components/Landing";
import ErrorDialog from "../components/ErrorDialog";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Router history={createBrowserHistory()}>
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
