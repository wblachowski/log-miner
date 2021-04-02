import React from "react";
import LogItem from "../LogItem";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LogList = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      {data.length > 0 ? (
        <List className={classes.root}>
          {data.map((log, idx) => (
            <LogItem log={{ ...log, idx }} key={idx} />
          ))}
        </List>
      ) : (
        <div />
      )}
    </>
  );
};

export default LogList;
