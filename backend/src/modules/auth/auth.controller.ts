import { Request, Response } from "express";

import { login, register } from "./auth.service.js";
import {
  loginSchema,
  registerSchema,
} from "./auth.validator.js";

export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate request body
    const data = registerSchema.parse(req.body);

    const { user, token } = await register(data);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = loginSchema.parse(req.body);

    const { user, token } = await login(data);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};