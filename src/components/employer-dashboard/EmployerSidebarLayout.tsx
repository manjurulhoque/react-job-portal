/* eslint-disable */
import React, { FC, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import "../../assets/css/employer.css";

interface Props {
	children: React.ReactNode;
	title?: string;
	subtitle?: string;
	action?: React.ReactNode;
}

const EmployerSidebarLayout: FC<Props> = ({
	children,
	title = "Dashboard",
	subtitle,
	action,
}) => {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	const handleLogout = () => {
		authContext.authDispatch({
			type: authContext.ActionTypes.LOGOUT,
			payload: {},
		});
		navigate("/", { replace: true });
	};

	return (
		<section className="employer-shell">
			<div className="container">
				<div className="employer-shell__inner">
					<aside className="employer-side">
						<h2 className="employer-side__title">Employer</h2>
						<ul className="employer-side__nav">
							<li>
								<NavLink to="/employer/dashboard/">
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink to="/employer/applicants/">
									Applicants
								</NavLink>
							</li>
							<li>
								<NavLink to="/post-job">Post a job</NavLink>
							</li>
							<li>
								<button type="button" onClick={handleLogout}>
									Log out
								</button>
							</li>
						</ul>
					</aside>

					<div className="employer-main">
						<div className="employer-head">
							<div>
								<h1>{title}</h1>
								{subtitle && <p>{subtitle}</p>}
							</div>
							{action}
						</div>
						{children}
					</div>
				</div>
			</div>
		</section>
	);
};

export default EmployerSidebarLayout;
