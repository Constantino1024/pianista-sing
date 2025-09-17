import { z } from "zod";

export const mermaidToPddlSchema = z.object({
  text: z.string().min(1, "Mermaid text is required"),
  domain: z.string().optional(),
  attempts: z.number().min(1).max(10).default(1),
});

export const pddlToMermaidSchema = z.object({
  pddl: z.string().min(1, "PDDL content is required"),
  pddl_type: z.enum(["domain", "problem"], {
    errorMap: () => ({ message: "PDDL type must be 'domain' or 'problem'" }),
  }),
});

export const naturalToPddlSchema = z.object({
  text: z.string().min(1, "Text description is required"),
  domain: z.string().optional(),
  pddl_type: z.enum(["domain", "problem"], {
    errorMap: () => ({ message: "PDDL type must be 'domain' or 'problem'" }),
  }),
  generate_both: z.boolean().default(false),
  attempts: z.number().min(1).max(10).default(1),
});