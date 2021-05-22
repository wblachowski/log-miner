import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { displayError } from "../../actions/actionCreators";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { URL } from "../../constants";
import { startLoading } from "../../actions/actionCreators";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const processFile = (file) => {
    var formData = new FormData();
    formData.append("file", file);
    dispatch(startLoading());
    axios
      .post(URL.CLUSTER, formData)
      .then((res) => {
        var data = JSON.parse(res.data);
        history.push({ pathname: "/result", state: { logs: data } });
      })
      .catch(() => {
        dispatch(displayError());
      });
  };

  const handleFileUpload = (event) => {
    var file = event.target.files[0];
    processFile(file);
  };

  return (
    <>
      <form>
        <input type="file" onChange={handleFileUpload} />
      </form>
      <h1>LogMiner</h1>
    </>
  );
};

export default withRouter(Landing);
