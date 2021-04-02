import axios from "axios";

import { receiveClusters, stopLoading, displayError } from '../actions/actionCreators';

import { URL } from "../constants";

export const sendLogs = (formData) => dispatch => {
  axios.post(URL.CLUSTER, formData).then((res)=>{
    var data = JSON.parse(res.data);
    dispatch(stopLoading());
    dispatch(receiveClusters(data));
  }).catch(()=>{
    dispatch(stopLoading())
    dispatch(displayError())
  });
}
