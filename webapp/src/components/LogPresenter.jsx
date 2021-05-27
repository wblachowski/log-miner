import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BubbleChart from "./BubbleChart";
import LogList from "./LogList";
import { withRouter } from "react-router-dom";
import { stopLoading } from "../actions/actionCreators";
import { useHistory } from "react-router-dom";

const LogPresenter = (state) => {
  const logs = state?.location?.state?.logs;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    logs ? dispatch(stopLoading()) : history.push("/");
  }, [logs]);

  return logs ? (
    <>
      <BubbleChart data={logs} />
      <LogList data={logs} />
    </>
  ) : (
    <div />
  );
};

export default withRouter(LogPresenter);
