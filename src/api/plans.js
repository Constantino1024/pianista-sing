import { api } from ".";

// POST /solve/pddl
export const postPlan = (domain, problem, options = {}) => {
  const params = new URLSearchParams();

  if (options.plannerId) params.append("planner_id", options.plannerId);
  if (options.convertRealTypes !== undefined) {
    params.append("convert_real_types", options.convertRealTypes);
  }

  const url = params.toString() ? `/solve/pddl?${params.toString()}` : '/solve/pddl';

  return api.post(url, {
    domain,
    problem,
  });
};

// GET /solve/pddl?id={id}
export const getPlanById = (id) => {
  return api.get(`/solve/pddl`, { params: { id } });
};
