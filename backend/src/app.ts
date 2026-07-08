import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import habitRoutes from "./modules/habits/habit.routes.js";
import logRoutes from "./modules/logs/log.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://karmyog-hp.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "KarmYog Backend"
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/analytics",
  analyticsRoutes
);

export default app;