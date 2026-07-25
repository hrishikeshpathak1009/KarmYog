import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../modules/auth/auth.types.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (
  payload: JwtPayload,
  expiresIn: SignOptions["expiresIn"] = "1d"
) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};