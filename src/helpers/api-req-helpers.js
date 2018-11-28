import axios from "axios";
import {
  getAuthToken,
  removeAuthToken,
  setErrorStatesToStore
} from "../helpers";

const api = axios.create({
  baseURL: process.env.REACT_APP_APIURL
});

api.interceptors.request.use(
  request => {
    const token = getAuthToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && (error.response.status > 400)) {
      removeAuthToken();

      const err = {
        open: true,
        message: error.response.data.message
      }
      setErrorStatesToStore(err)
    }
    return Promise.reject(error);
  }
);

export const apiReq = api;