import { Request, Response } from "express";

import { getAnalytics } from "./analytics.service.js";

export const getAnalyticsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;

    const analytics = await getAnalytics(userId);

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to load analytics",
    });
  }
};