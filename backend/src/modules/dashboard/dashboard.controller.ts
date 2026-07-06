import { Request, Response } from "express";

import { getDashboard } from "./dashboard.service.js";

export const getDashboardController = async (
  req: Request,
  res: Response
) => {
  const dashboard = await getDashboard(
    req.user!.id
  );

  res.json(dashboard);
};