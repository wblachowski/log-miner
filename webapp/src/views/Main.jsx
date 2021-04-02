import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendLogs } from "../actions/thunks";

import DragAndDrop from "../components/DragAndDrop";
import LogPresenter from "../components/LogPresenter";
import ErrorDialog from "../components/ErrorDialog";
import { Container } from "@material-ui/core";
import { startLoading } from "../actions/actionCreators";
import { getLoading } from "../selectors";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

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
    dispatch(sendLogs(formData));
    dispatch(startLoading());
  };

  const handleFileUpload = (event) => {
    var file = event.target.files[0];
    processFile(file);
  };

  const handleFileDrop = (files) => {
    var file = files[0];
    processFile(file);
  };

  return (
    <DragAndDrop handleDrop={handleFileDrop}>
      <Container>
        <Container>
          <form>
            <input type="file" onChange={handleFileUpload} />
          </form>
          <h1>LogMiner</h1>
        </Container>
        <Backdrop className={classes.backdrop} open={!!loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <LogPresenter />
        <ErrorDialog />
      </Container>
    </DragAndDrop>
  );
};

export default Dashboard;
