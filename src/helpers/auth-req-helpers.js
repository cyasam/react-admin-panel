import axios from "axios";

const auth = axios.create({
  baseURL: process.env.REACT_APP_AUTHURL
});

export const authReq = auth;
