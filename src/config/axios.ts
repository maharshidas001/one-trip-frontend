import axios from "axios";
import { envConfig } from "./envConfig";

const api = axios.create({
  baseURL: envConfig.backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

export { api };