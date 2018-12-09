import axios from 'axios';
import {
  getAuthToken,
  removeAuthToken,
  setAuthStateToStore,
  setLoadSnackToStore,
  setLoadingStateToStore,
} from '../helpers';

const api = axios.create({
  baseURL: process.env.REACT_APP_APIURL,
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
  },
);

api.interceptors.response.use(
  response => {
    setLoadingStateToStore(false);
    return response;
  },
  error => {
    const err = {
      open: true,
      message: error.message,
    };

    if (error.response) {
      if (error.response.status === 401) {
        removeAuthToken();

        err.message = error.response.data.message;

        setAuthStateToStore(false);
      }
    }

    setLoadSnackToStore(err);
    setLoadingStateToStore(false);
    return Promise.reject(error);
  },
);

export const apiReq = api;
