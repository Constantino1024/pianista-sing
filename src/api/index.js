import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/json",
    "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_KEY,
  },
});

export * from './plans';
export * from './planners';
export * from './solvers';
export * from './solves';
export * from './validatores';

// GET /
export const getRoot = () => api.get("/");
