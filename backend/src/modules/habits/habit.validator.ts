import { z } from "zod";

export const createHabitSchema = z.object({
  title: z.string().min(1).max(100),

  type: z.enum(["progress", "completion"]).default("progress"),
  description: z.string().optional(),

  icon: z.string().optional(),

  color: z.string().optional(),

  frequency: z
    .enum(["daily", "weekly", "monthly"])
    .default("daily"),

  targetValue: z.number().int().positive().default(1),

  unit: z.string().default("times"),
});

export const updateHabitSchema =
  createHabitSchema.partial();