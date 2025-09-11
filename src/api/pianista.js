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

export * from './planners';

// GET /
export const getRoot = () => api.get("/");
