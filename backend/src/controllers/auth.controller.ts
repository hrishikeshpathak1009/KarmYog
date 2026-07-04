import { Request, Response } from "express";import { register as registerService } from "../services/auth.service.js";

export const register = async (req, res) => {
    const result = await registerService(req.body);

    res.status(201).json(result);
};