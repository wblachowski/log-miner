import React from "react";
import { useSelector } from "react-redux";

import { getClusters } from "../../selectors";

import BubbleChart from "../Chart/BubbleChart";
import LogList from "../LogList";

const LogPresenter = () => {
  const logs = useSelector(getClusters);
  return logs ? (
    <>
      <BubbleChart data={logs} />
      <LogList data={logs} />
    </>
  ) : (
    <div />
  );
};

export default LogPresenter;
