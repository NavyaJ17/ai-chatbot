import React from "react";
import { useAuth } from "../Context/authContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { user } = useAuth();

  console.log("PrivateRoute user:", user);

  if (user && user.isLoggedIn) {
    console.log(user);
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoute;
