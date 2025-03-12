import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserId } from "../services/AuthService";

const PublicRoute = () => {
  const userId = getUserId();
  return userId ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
