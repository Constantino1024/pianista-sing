import { api } from ".";

// POST /convert/mermaid[?attempts]
export const postConvertMermaidToPddl = (text, domain = null, attempts = 1) => {
  const params = new URLSearchParams();
  if (attempts) params.append("attempts", attempts);

  const body = { text };
  if (domain) body.domain = domain;

  return api.post(`/convert/mermaid?${params.toString()}`, body);
};
