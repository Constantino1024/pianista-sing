import { z } from "zod";

export const planSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
  problem: z.string().min(1, "Problem is required"),
  convertRealTypes: z.boolean().default(true),
});

export const getPlanSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
});