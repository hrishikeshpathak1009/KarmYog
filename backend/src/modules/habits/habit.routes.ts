import { Router } from "express";

import {
  createHabitController,
  deleteHabitController,
  getHabitController,
  getHabitsController,
  updateHabitController,
} from "./habit.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

// Protect all habit routes
router.use(authMiddleware);

router.post("/", createHabitController);

router.get("/", getHabitsController);

router.get("/:id", getHabitController);

router.patch("/:id", updateHabitController);

router.delete("/:id", deleteHabitController);

export default router;