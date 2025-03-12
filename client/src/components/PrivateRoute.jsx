import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserId } from "../services/AuthService";

const PrivateRoute = () => {
  const userId = getUserId();
  // If no userId, redirect to login page
  return userId ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
