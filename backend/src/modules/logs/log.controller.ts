import { Request, Response } from "express";

import { updateTodayLogSchema } from "./log.validator.js";
import { updateTodayLog } from "./log.service.js";
import {
  incrementLog,
  decrementLog,
  completeLog,
  getHabitLogs,
} from "./log.service.js";



export const updateTodayLogController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = updateTodayLogSchema.parse(req.body);

    const log = await updateTodayLog(
      req.params.habitId as string,
      data
    );

    res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update today's log",
    });
  }
};

export const incrementLogController = async (
  req: Request,
  res: Response
) => {
  try {
    const log = await incrementLog(req.params.habitId  as string);

    res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to increment log",
    });
  }
};

export const decrementLogController = async (
  req: Request,
  res: Response
) => {
  try {
    const log = await decrementLog(req.params.habitId as string);

    res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to decrement log",
    });
  }
};

export const completeLogController = async (
  req: Request,
  res: Response
) => {
  try {
    const log = await completeLog(req.params.habitId as string);

    res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to complete log",
    });
  }
};

export const getHabitLogsController = async (
  req: Request,
  res: Response
) => {
  try {
    const logs = await getHabitLogs(req.params.habitId as string);

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch logs",
    });
  }
};