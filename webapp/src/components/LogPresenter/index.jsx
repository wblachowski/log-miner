import React, { useEffect } from "react";
import BubbleChart from "../Chart/BubbleChart";
import LogList from "../LogList";
import { withRouter } from "react-router-dom";

const LogPresenter = (state) => {
  const logs = state?.location?.state?.logs;

  useEffect(() => {
    console.log("PRESENTER USE EFFECT");
  }, []);

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
