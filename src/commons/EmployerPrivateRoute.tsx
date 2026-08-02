/* eslint-disable */
import React, { FC, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

interface Props {
	children: React.ReactNode;
}

const EmployerPrivateRoute: FC<Props> = ({ children }) => {
	const authContext = useContext(AuthContext);

	if (authContext.state.isLoading) {
		return <h2>Loading...</h2>;
	} else if (!authContext.state.isAuthenticated) {
		return <Navigate to="/login" replace />;
	} else if (
		!authContext.state.user ||
		authContext.state.user.role != "employer"
	) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default EmployerPrivateRoute;
