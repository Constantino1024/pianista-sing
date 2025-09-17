import axios from "axios";
import { config } from "@config/environment.js";

export const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    ...config.api.headers,
    "Ocp-Apim-Subscription-Key": config.api.key,
  },
});

export * from './plans';
export * from './planners';
export * from './solvers';
export * from './solves';
export * from './validators';
export * from './converters';


// GET /
export const getRoot = () => api.get("/");
