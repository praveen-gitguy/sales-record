import React from "react";
import { Outlet } from "react-router-dom";
import DashboardContextProvider from "../../../services/dashboard/dashboard.context";

export default function DashboardLayout() {
  return (
    <div>
      <DashboardContextProvider>
        <Outlet />
      </DashboardContextProvider>
    </div>
  );
}
