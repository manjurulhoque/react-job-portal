/* eslint-disable */
import React, { FC, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
	children: React.ReactNode;
	title?: string;
}

const EmployerSidebarLayout: FC<Props> = ({
	children,
	title = "Dashboard",
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext.state;

	const handleLogout = () => {
		authContext.authDispatch({
			type: authContext.ActionTypes.LOGOUT,
			payload: {},
		});

		navigate("/", { replace: true });
	};

	const getActiveClass = (url: string) => {
		return url === location.pathname ? "active" : "";
	};

	return (
		<React.Fragment>
			<div className="page-header">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="inner-header">
								<h3>{title}</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="content">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-xs-12">
							<div className="right-sideabr">
								<h4>Manage Account</h4>
								<ul className="list-item">
									<li>
										<NavLink
											className={getActiveClass(
												"/employer/dashboard/",
											)}
											to="/employer/dashboard/"
										>
											Dashboard
										</NavLink>
									</li>
									<li>
										<NavLink
											className={getActiveClass(
												"/employer/applicants/",
											)}
											to="/employer/applicants/"
										>
											Applicants
										</NavLink>
									</li>
									<li>
										<a href="#!">Change Password</a>
									</li>
									<li
										onClick={handleLogout}
										style={{ cursor: "pointer" }}
									>
										<a>Sing Out</a>
									</li>
								</ul>
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default EmployerSidebarLayout;
