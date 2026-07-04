import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../../config/db.js";
import { users } from "../../schemas/user.js";
import { generateToken } from "../../utils/jwt.js";

import {
  LoginUserInput,
  RegisterUserInput,
} from "./auth.types.js";

export const register = async (data: RegisterUserInput) => {
  // Check if email already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Insert user
  const [newUser] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
    })
    .returning();

  // Generate JWT
  const token = generateToken({
    userId: newUser.id,
  });

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};

export const login = async (data: LoginUserInput) => {
  // Find user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = generateToken({
    userId: user.id,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};