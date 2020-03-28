import React from "react";
import { NotificationContainer } from "react-notifications";
import { Switch } from "react-router-dom";
import { HospitalList } from "./components/hospital-list.component";
import { Hospital } from "./components/hospital.component";
import { Login } from "./components/login.component";
import { ProtectedRoute, PublicRoute, AdminRoute } from "./shared";
import { Footer } from "./shared/footer.component";
import { GlobalSuspense } from "./shared/global-suspense.component";
import { Header } from "./shared/header.component";
import { ManageTags } from "./components/manage-tags";
import { AdminDashboard } from "./components/admin-dashboard";
import { ManageInventory } from "./components/manage-inventory";
import { ManageHospitals } from "./components/manage-hospitals";

export function AppComponent() {
  return (
    <GlobalSuspense>
      <Header />
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={HospitalList} />
        <ProtectedRoute exact path="/details/:id" component={Hospital} />
        <AdminRoute exact path="/admin" component={AdminDashboard} />
        <AdminRoute exact path="/admin/tags" component={ManageTags} />
        <AdminRoute exact path="/admin/inventory" component={ManageInventory} />
        <AdminRoute exact path="/admin/hospitals" component={ManageHospitals} />
        <AdminRoute exact path="/admin/ysers" component={AdminDashboard} />
      </Switch>
      <Footer />
      <NotificationContainer />
    </GlobalSuspense>
  );
}
