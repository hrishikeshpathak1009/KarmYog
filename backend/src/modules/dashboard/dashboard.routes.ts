import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { getDashboardController } from "./dashboard.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getDashboardController);

export default router;