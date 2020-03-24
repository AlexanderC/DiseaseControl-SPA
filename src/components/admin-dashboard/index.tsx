import React, { FunctionComponent } from "react";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";

type AdminDashboardProps = {};

export const AdminDashboard: FunctionComponent<AdminDashboardProps> = (
  props
) => {
  return (
    <AdminDashboardLayout>
      <div>Admin Dashboard</div>
    </AdminDashboardLayout>
  );
};
