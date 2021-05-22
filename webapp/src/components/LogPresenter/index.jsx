import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BubbleChart from "../Chart/BubbleChart";
import LogList from "../LogList";
import { withRouter } from "react-router-dom";
import { stopLoading } from "../../actions/actionCreators";

const LogPresenter = (state) => {
  const logs = state?.location?.state?.logs;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopLoading());
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
