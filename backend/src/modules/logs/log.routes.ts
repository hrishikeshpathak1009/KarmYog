import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { updateTodayLogController } from "./log.controller.js";
import { incrementLogController,decrementLogController,completeLogController,getHabitLogsController } from "./log.controller.js";
const router = Router();

router.use(authMiddleware);

router.post(
  "/:habitId/increment",
  authMiddleware,
  incrementLogController
);

router.post(
  "/:habitId/decrement",
  authMiddleware,
  decrementLogController
);

router.post(
  "/:habitId/complete",
  authMiddleware,
  completeLogController
);

router.get(
  "/:habitId",
  authMiddleware,
  getHabitLogsController
);

router.patch(
  "/:habitId/logs/today",
  updateTodayLogController
);

export default router;