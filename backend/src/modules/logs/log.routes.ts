import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { updateTodayLogController } from "./log.controller.js";

const router = Router();

router.use(authMiddleware);

router.patch(
  "/:habitId/logs/today",
  updateTodayLogController
);

export default router;