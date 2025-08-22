import axios from "axios";
import { envConfig } from "./envConfig";

const api = axios.create({
  baseURL: envConfig.backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };