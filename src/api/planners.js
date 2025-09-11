import { api } from '.';

// GET /planners
export const getPlanners = () => api.get("/planners");

// GET /planners/:id 
export const getPlannerById = (id) => api.get(`/planners/${id}`);