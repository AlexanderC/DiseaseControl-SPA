import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

export function PublicRoute(props: RouteProps) {
  const [isLoggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("currentUser") !== ""
  );

  React.useEffect(function () {
    const onStorageChange = () =>
      setLoggedIn(localStorage.getItem("currentUser") !== "");
    // this will monitor any storage changes
    // if `currentUser` is removed user will be looged out
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return isLoggedIn ? <Redirect to="/" /> : <Route {...props} />;
}
