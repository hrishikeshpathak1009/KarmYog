import { Router } from "express";

import {
  loginController,
  logoutController,
  meController,
  registerController,
} from "./auth.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.get("/me", authMiddleware, meController);

export default router;