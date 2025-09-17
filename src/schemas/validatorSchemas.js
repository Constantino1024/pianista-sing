import { z } from "zod";

export const PDDL_TYPES = ["domain", "problem", "plan", ""];

export const validatePddlSchema = z.object({
  pddl: z.string().min(1, "PDDL content is required"),
  pddl_type: z
    .enum(PDDL_TYPES, {
      errorMap: () => ({ message: "Invalid PDDL type" }),
    })
    .optional(),
});

export const validatePddlMatchSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
  problem: z.string().min(1, "Problem is required"),
});

export const validatePddlPlanSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
  problem: z.string().min(1, "Problem is required"),
  plan: z.string().min(1, "Plan is required"),
});