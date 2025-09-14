import { api } from ".";

// POST /convert/mermaid[?attempts]
export const postConvertMermaidToPddl = (text, domain = null, attempts = 1) => {
  const params = new URLSearchParams();
  if (attempts) params.append("attempts", attempts);

  const body = { text };
  if (domain) body.domain = domain;

  return api.post(`/convert/mermaid?${params.toString()}`, body);
};

// POST /convert/mermaid/{pddl_type}
export const postConvertPddlToMermaid = (pddl_type, pddl) => {
  return api.post(`/convert/mermaid/${pddl_type}`, { pddl });
};

// POST /convert/natural_language/{pddl_type}[?generate_both][&attempts]
export const postGeneratePddl = (
  pddlType,
  prompt,
  generateBoth = false,
  attempts = 1
) => {
  const params = new URLSearchParams();
  if (generateBoth) params.append("generate_both", generateBoth);
  if (attempts && attempts !== 1) params.append("attempts", attempts);

  const body = { text: prompt.text };
  if (prompt.domain) body.domain = prompt.domain;

  const queryString = params.toString();
  const url = queryString
    ? `/convert/natural_language/${pddlType}?${queryString}`
    : `/convert/natural_language/${pddlType}`;

  return api.post(url, body);
};