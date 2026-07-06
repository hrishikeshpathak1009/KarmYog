import { Request, Response } from "express";

import {
  createHabitSchema,
  updateHabitSchema,
} from "./habit.validator.js";

import {
  createHabit,
  deleteHabit,
  getHabitById,
  getHabits,
  updateHabit,
} from "./habit.service.js";

export const createHabitController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createHabitSchema.parse(req.body);

    const habit = await createHabit(req.user!.id, data);

    res.status(201).json({
      success: true,
      habit,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create habit",
    });
  }
};

export const getHabitsController = async (
  req: Request,
  res: Response
) => {
  const habits = await getHabits(req.user!.id);

  res.status(200).json({
    success: true,
    habits,
  });
};

export const getHabitController = async (
  req: Request,
  res: Response
) => {
  const habit = await getHabitById(
    req.user!.id,
    req.params.id as string
  );

  if (!habit) {
    return res.status(404).json({
      success: false,
      message: "Habit not found",
    });
  }

  res.status(200).json({
    success: true,
    habit,
  });
};

export const updateHabitController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = updateHabitSchema.parse(req.body);

    const habit = await updateHabit(
      req.user!.id,
      req.params.id as string,
      data
    );

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    res.status(200).json({
      success: true,
      habit,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update habit",
    });
  }
};

export const deleteHabitController = async (
  req: Request,
  res: Response
) => {
  await deleteHabit(req.user!.id, req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Habit deleted successfully",
  });
};