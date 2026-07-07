import { z } from "zod";
import {
  createHabitSchema,
  updateHabitSchema,
} from "./habit.validator.js";

export type CreateHabitInput = z.infer<
  typeof createHabitSchema
>;

export type UpdateHabitInput = z.infer<
  typeof updateHabitSchema
>;

export type HabitType =
  CreateHabitInput["type"];