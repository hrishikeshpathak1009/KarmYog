import jwt from "jsonwebtoken";
import { JwtPayload } from "../modules/auth/auth.types.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};