import { z } from "zod";

export const solveSchema = z.object({
  model_str: z.string().min(1, "Model is required"),
  model_params: z.string().min(1, "Model parameters are required"),
});

export const getSolveSchema = z.object({
  solveId: z.string().min(1, "Solution ID is required"),
});