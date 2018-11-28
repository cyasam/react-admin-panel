import axios from "axios";
import { removeAuthToken } from "../helpers";
import store from "../store";

const auth = axios.create({
  baseURL: process.env.REACT_APP_AUTHURL
});

auth.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response && (error.response.status > 400)) {
      removeAuthToken();
      store.dispatch({
        type: "APP_AUTH",
        payload: false
      });
    }
    return Promise.reject(error);
  }
);

export const authReq = auth;
