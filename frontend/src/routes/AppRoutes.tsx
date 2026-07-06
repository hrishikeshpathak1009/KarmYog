import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";

function Placeholder({ title }: { title: string }) {
  return <h1 className="text-3xl">{title}</h1>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/habits"
            element={<Placeholder title="Habits" />}
          />

          <Route
            path="/analytics"
            element={<Placeholder title="Analytics" />}
          />

          <Route
            path="/settings"
            element={<Placeholder title="Settings" />}
          />
        </Route>
      </Route>
    </Routes>
  );
}