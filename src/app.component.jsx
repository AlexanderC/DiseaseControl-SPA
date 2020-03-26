import React from "react";
import { NotificationContainer } from "react-notifications";
import { Switch } from "react-router-dom";
import { HospitalList } from "./components/hospital-list.component";
import { Hospital } from "./components/hospital.component";
import { Login } from "./components/login.component";
import { ProtectedRoute, PublicRoute } from "./shared";
import { Footer } from "./shared/footer.component";
import { GlobalSuspense } from "./shared/global-suspense.component";
import { Header } from "./shared/header.component";

export function AppComponent() {
  return (
    <GlobalSuspense>
      <Header />
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={HospitalList} />
        <ProtectedRoute exact path="/details/:id" component={Hospital} />
      </Switch>
      <Footer />
      <NotificationContainer />
    </GlobalSuspense>
  );
}
