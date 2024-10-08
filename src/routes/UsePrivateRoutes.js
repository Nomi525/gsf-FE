import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UsePrivateRoutes = () => {
  const adminToken = localStorage.getItem("accessToken");

  console.log(adminToken, "adminToken");

  return adminToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default UsePrivateRoutes;
