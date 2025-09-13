import { api } from ".";

// POST /solve/minizinc[?solver_name]
export const postSolve = (model_str, model_params, solver_name = null) => {
  const params = new URLSearchParams();
  if (solver_name) params.append("solver_name", solver_name);

  return api.post(`/solve/minizinc?${params.toString()}`, {
    model_str,
    model_params,
  });
};

// GET /solve/minizinc?id={id}
export const getSolveById = (id) =>
  api.get(`/solve/minizinc`, { params: { id } });
