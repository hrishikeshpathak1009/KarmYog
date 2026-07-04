import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);



export default app;