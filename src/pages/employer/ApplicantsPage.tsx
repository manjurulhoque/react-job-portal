/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import dayjs from "dayjs";
import { AuthContext } from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import AcceptRejectModal from "../../components/modals/AcceptRejectModal";
import { IApplicant, IUser } from "../../interfaces";

const statusClass = (status: string) => {
	const value = String(status).toLowerCase();
	if (value === "accepted" || value === "2") return "employer-badge--accepted";
	if (value === "rejected" || value === "3") return "employer-badge--rejected";
	return "employer-badge--pending";
};

const statusLabel = (status: string) => {
	const value = String(status).toLowerCase();
	if (value === "2" || value === "accepted") return "Accepted";
	if (value === "3" || value === "rejected") return "Rejected";
	if (value === "1" || value === "pending") return "Pending";
	return status || "Pending";
};

const isPending = (status: string) => {
	const value = String(status).toLowerCase();
	return value === "pending" || value === "1";
};

const ApplicantsPage: FC = () => {
	const [applicants, setApplicants] = useState<IApplicant[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [acceptModalShow, setAcceptModalShow] = useState(false);
	const [type, setType] = useState("");
	const [applicant, setApplicant] = useState<IApplicant | null>(null);
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		AxiosConfig.get("/employer/applicants/", config)
			.then((res) => {
				setApplicants(res.data || []);
				setError("");
			})
			.catch(() => setError("Failed to load applicants."))
			.finally(() => setLoading(false));
	}, [token]);

	const getFullname = (user: IUser) =>
		`${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
		"Applicant";

	const onUpdateApplicant = (item: IApplicant, action: string) => {
		setApplicant(item);
		setType(action);
		setAcceptModalShow(true);
	};

	const handleStatusUpdated = (id: number, nextStatus: string) => {
		setApplicants((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, status: nextStatus } : item,
			),
		);
	};

	return (
		<BaseLayout title={"Applicants"}>
			<EmployerSidebarLayout
				title="Applicants"
				subtitle="Review everyone who applied across your job posts."
			>
				<div className="employer-panel">
					{loading && (
						<div className="employer-loading" aria-hidden="true">
							<div className="employer-skel" />
							<div className="employer-skel" style={{ width: "75%" }} />
							<div className="employer-skel" style={{ width: "60%" }} />
						</div>
					)}

					{!loading && error && (
						<div className="employer-error" role="alert">
							<h2>Something went wrong</h2>
							<p>{error}</p>
						</div>
					)}

					{!loading && !error && applicants.length === 0 && (
						<div className="employer-empty">
							<h2>No applicants yet</h2>
							<p>
								When candidates apply to your jobs, they will
								show up here.
							</p>
						</div>
					)}

					{!loading && !error && applicants.length > 0 && (
						<>
							<div className="employer-table-head employer-row--apps">
								<span>Applicant</span>
								<span>Job</span>
								<span>Status</span>
								<span>Applied</span>
								<span>Actions</span>
							</div>
							{applicants.map((item) => (
								<div
									className="employer-row employer-row--apps"
									key={item.id}
								>
									<div>
										<h3 className="employer-job__title">
											{getFullname(item.applied_user)}
										</h3>
									</div>
									<div>
										<h3 className="employer-job__title">
											<Link to={`/jobs/${item.job.id}`}>
												{item.job.title}
											</Link>
										</h3>
										<p className="employer-job__meta">
											<i
												className="lni-map-marker"
												aria-hidden="true"
											/>
											{item.job.location || "Location n/a"}
										</p>
									</div>
									<div>
										<span
											className={`employer-badge ${statusClass(item.status)}`}
										>
											{statusLabel(item.status)}
										</span>
									</div>
									<div className="employer-job__meta">
										{dayjs(item.created_at).format(
											"MMM D, YYYY",
										)}
									</div>
									<div className="employer-actions">
										{isPending(item.status) && (
											<>
												<button
													type="button"
													className="employer-actions__accept"
													onClick={() =>
														onUpdateApplicant(
															item,
															"accept",
														)
													}
												>
													Accept
												</button>
												<button
													type="button"
													className="employer-actions__reject"
													onClick={() =>
														onUpdateApplicant(
															item,
															"reject",
														)
													}
												>
													Reject
												</button>
											</>
										)}
									</div>
								</div>
							))}
						</>
					)}
				</div>

				{applicant && (
					<AcceptRejectModal
						show={acceptModalShow}
						type={type}
						applicant={applicant}
						onHide={() => setAcceptModalShow(false)}
						onUpdated={handleStatusUpdated}
					/>
				)}
			</EmployerSidebarLayout>
		</BaseLayout>
	);
};

export default ApplicantsPage;
