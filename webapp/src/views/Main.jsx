import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DragAndDrop from "../components/DragAndDrop";
import LogPresenter from "../components/LogPresenter";
import Landing from "../components/Landing";
import ErrorDialog from "../components/ErrorDialog";
import { Container } from "@material-ui/core";
import { getLoading } from "../selectors";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { startLoading } from "../actions/actionCreators";
import { displayError } from "../actions/actionCreators";
import { URL } from "../constants";

const hist = createBrowserHistory();
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  const processFile = (file) => {
    var formData = new FormData();
    formData.append("file", file);
    dispatch(startLoading());
    axios
      .post(URL.CLUSTER, formData)
      .then((res) => {
        var data = JSON.parse(res.data);
        hist.push({ pathname: "/result", state: { logs: data } });
      })
      .catch(() => {
        dispatch(displayError());
      });
  };
  const handleFileDrop = (files) => {
    var file = files[0];
    processFile(file);
  };
  return (
    <>
      <DragAndDrop handleDrop={handleFileDrop}>
        <Container>
          <Container>
            <Router history={hist}>
              <Switch>
                <Route path="/result" component={LogPresenter} />
                <Route path="/" component={Landing} />
              </Switch>
            </Router>
            <Backdrop className={classes.backdrop} open={!!loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Container>
        </Container>
      </DragAndDrop>
      <ErrorDialog />
    </>
  );
};

export default Dashboard;
