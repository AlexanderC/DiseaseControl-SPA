import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteProps, Redirect } from "react-router-dom";

import { selectUserProfile } from "../reducers/Combiner";
import { ProtectedRoute } from "./ProtectedRoute";
import { getUserProfile } from "../actions/DataActions";

export function AdminRoute(props: RouteProps) {
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userProfile) {
      dispatch(getUserProfile());
    }
  }, [userProfile, dispatch]);

  if (!userProfile) {
    return null;
  }

  return userProfile.type === "admin" ? <ProtectedRoute {...props} /> : <Redirect to="/" />;
}
