import { api } from ".";

// POST /validate/pddl[?pddl_type]
export const postValidatePddl = (pddl, pddl_type = null) => {
  const params = new URLSearchParams();
  if (pddl_type) params.append("pddl_type", pddl_type);

  return api.post(`/validate/pddl?${params.toString()}`, { pddl });
};

// POST /validate/match/pddl
export const postValidatePddlMatch = (domain, problem) => {
  return api.post(`/validate/match/pddl`, {
    domain,
    problem,
  });
};