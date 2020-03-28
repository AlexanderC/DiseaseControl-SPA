import React, { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
// import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";

type AdminDashboardProps = {};

export const AdminDashboard: FunctionComponent<AdminDashboardProps> = (props) => {
  return (
    // <AdminDashboardLayout>
    //   <div>Admin Dashboard</div>
    // </AdminDashboardLayout>
    <Redirect to="/admin/hospitals" />
  );
};
