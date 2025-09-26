import { z } from "zod";

const parameterSchema = z.object({
  name: z.string().min(1, "Parameter name is required"),
  value: z.union([z.string(), z.number(), z.boolean()]),
  type: z.enum(["string", "number", "boolean"])
});

export const solveSchema = z.object({
  model_str: z.string().min(1, "Model is required"),
  model_params: z.union([
    z.string().min(1, "Model parameters are required"),
    z.array(parameterSchema)
  ]),
});

export const getSolveSchema = z.object({
  solveId: z.string().min(1, "Solution ID is required"),
});