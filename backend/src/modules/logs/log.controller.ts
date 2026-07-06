import { Request, Response } from "express";

import { updateTodayLogSchema } from "./log.validator.js";
import { updateTodayLog } from "./log.service.js";

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