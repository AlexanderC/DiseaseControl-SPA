import React, { useState, useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserProfile } from "../actions/DataActions";
import { selectUserProfile } from "../reducers/Combiner";

export function ProtectedRoute(props: RouteProps) {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("currentUser") !== ""
  );

  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  const [userLoaded, setUserLoaded] = useState(userProfile ? true : false);

  useEffect(() => {
    if (userProfile) {
      return;
    }

    if (isLoggedIn) {
      dispatch(getUserProfile()).then(() => setUserLoaded(true));
    } else {
      setUserLoaded(true);
    }
  }, [isLoggedIn]);

  useEffect(function () {
    const onStorageChange = () =>
      setLoggedIn(localStorage.getItem("currentUser") !== "");
    // this will monitor any storage changes
    // if `currentUser` is removed user will be looged out
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return !userLoaded ? null : userProfile ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
}
