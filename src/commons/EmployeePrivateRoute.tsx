/* eslint-disable */
import React, { FC, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const EmployeePrivateRoute: FC<any> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (authContext.state.isLoading) {
    return <h2>Loading...</h2>;
  } else if (!authContext.state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (
    !authContext.state.user ||
    authContext.state.user.role !== "employee"
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default EmployeePrivateRoute;
