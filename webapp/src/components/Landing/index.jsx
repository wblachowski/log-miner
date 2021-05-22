import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import DragAndDrop from "../../components/DragAndDrop";
import { Container } from "@material-ui/core";
import { displayError } from "../../actions/actionCreators";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { URL } from "../../constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Landing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const processFile = (file) => {
    var formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    axios
      .post(URL.CLUSTER, formData)
      .then((res) => {
        var data = JSON.parse(res.data);
        setLoading(false);
        history.push({ pathname: "/result", state: { logs: data } });
      })
      .catch(() => {
        setLoading(false);
        dispatch(displayError());
      });
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
      </Container>
    </DragAndDrop>
  );
};

export default withRouter(Landing);
