import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import SigninPage from "../../features/auth/pages/SigninPage";
import SignupPage from "../../features/auth/pages/SignupPage";
import CreateSale from "../../features/Dashboard/pages/CreateSale";
import DashboardHome from "../../features/Dashboard/pages/DashboardHome";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Navigation() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="create" element={<CreateSale />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<SigninPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}
