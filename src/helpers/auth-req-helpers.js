import axios from 'axios';
import { setLoadingStateToStore } from '../helpers';

const auth = axios.create({
  baseURL: process.env.REACT_APP_AUTHURL,
});

auth.interceptors.response.use(
  response => {
    setLoadingStateToStore(false);
    return response;
  },
  error => {
    setLoadingStateToStore(false);
    return Promise.reject(error);
  },
);

export const authReq = auth;
