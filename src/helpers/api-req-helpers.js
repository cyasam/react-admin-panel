import axios from "axios";
import { getAuthToken, removeAuthToken } from "../helpers";

const api = axios.create({
  baseURL: process.env.REACT_APP_APIURL
});

api.interceptors.request.use(
  function(request) {
    const token = getAuthToken();
    if(token){
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response && (error.response.status > 400)) {
      removeAuthToken();
      /* store.dispatch({
        type: "APP_AUTH",
        payload: false
      }); */
    }
    return Promise.reject(error);
  }
);

export const apiReq = api;
