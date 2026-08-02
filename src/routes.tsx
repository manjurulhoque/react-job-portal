import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployerPrivateRoute from "./commons/EmployerPrivateRoute";
import PostJobPage from "./pages/employer/PostJobPage";
import AppliedJobsPage from "./pages/employee/AppliedJobsPage";
import EmployeePrivateRoute from "./commons/EmployeePrivateRoute";
import EditProfilePage from "./pages/employee/EditProfilePage";
import DashboardPage from "./pages/employer/DashboardPage";
import ApplicantsPage from "./pages/employer/ApplicantsPage";
import ApplicantsPerJobPage from "./pages/employer/ApplicantsPerJobPage";

const BaseRouter = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route path="/jobs/:id" element={<JobDetailsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* Employer routes */}
				<Route
					path="/post-job/"
					element={
						<EmployerPrivateRoute>
							<PostJobPage />
						</EmployerPrivateRoute>
					}
				/>
				<Route
					path="/employer/dashboard/"
					element={
						<EmployerPrivateRoute>
							<DashboardPage />
						</EmployerPrivateRoute>
					}
				/>
				<Route
					path="/employer/applicants/"
					element={
						<EmployerPrivateRoute>
							<ApplicantsPage />
						</EmployerPrivateRoute>
					}
				/>
				<Route
					path="/employer/applicants/:job_id"
					element={
						<EmployerPrivateRoute>
							<ApplicantsPerJobPage />
						</EmployerPrivateRoute>
					}
				/>

				{/* Employee routes */}
				<Route
					path="/edit-profile/"
					element={
						<EmployeePrivateRoute>
							<EditProfilePage />
						</EmployeePrivateRoute>
					}
				/>
				<Route
					path="/applied-jobs/"
					element={
						<EmployeePrivateRoute>
							<AppliedJobsPage />
						</EmployeePrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
};

export default BaseRouter;
