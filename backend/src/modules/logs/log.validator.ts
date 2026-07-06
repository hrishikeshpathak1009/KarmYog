import { z } from "zod";

export const updateTodayLogSchema = z.object({
  completedValue: z
    .number()
    .int()
    .min(0),

  note: z.string().optional(),
});