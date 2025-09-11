import { api } from '.';

// GET /solvers
export const getSolvers = () => api.get("/solvers");

// GET /solvers/:id
export const getSolverById = (id) => api.get(`/solvers/${id}`);