/* eslint-disable */
import React, { useState, useEffect, useContext, useMemo, FC } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import BaseLayout from "../../components/BaseLayout";
import { IJob } from "../../interfaces";
import "../../assets/css/applied-jobs.css";

const STATUS_LABELS: Record<string, string> = {
	"1": "Pending",
	"2": "Accepted",
	"3": "Rejected",
};

const STATUS_CLASS: Record<string, string> = {
	"1": "applied-badge--pending",
	"2": "applied-badge--accepted",
	"3": "applied-badge--rejected",
};

const TYPE_LABELS: Record<string, string> = {
	"1": "Full time",
	"2": "Part time",
	"3": "Internship",
};

const AppliedJobsPage: FC = () => {
	const [loading, setLoading] = useState(true);
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [error, setError] = useState("");
	const [status, setStatus] = useState("");
	const [appliedStatus, setAppliedStatus] = useState("");
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const { t } = useTranslation();

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		setLoading(true);
		AxiosConfig.get(`applied-jobs/`, config)
			.then((res) => {
				setJobs(res.data || []);
				setError("");
			})
			.catch(() => {
				setError("Failed to load your applications. Please try again.");
				setJobs([]);
			})
			.finally(() => setLoading(false));
	}, [token]);

	const filteredJobs = useMemo(() => {
		if (!["1", "2", "3"].includes(appliedStatus)) return jobs;
		return jobs.filter(
			(job) => String(job.applicant?.status) === appliedStatus,
		);
	}, [jobs, appliedStatus]);

	const handleFilter = () => {
		setAppliedStatus(status);
	};

	const handleClear = () => {
		setStatus("");
		setAppliedStatus("");
	};

	const getInitials = (name?: string) =>
		(name || "JP")
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part.charAt(0).toUpperCase())
			.join("");

	return (
		<BaseLayout title={t("employee:applied-jobs")}>
			<section className="applied-page">
				<div className="container">
					<div className="applied-page__head">
						<h1>{t("employee:applied-jobs")}</h1>
						<p>
							Track the roles you have applied for and filter by
							application status.
						</p>
					</div>

					<div className="applied-page__toolbar">
						<div className="applied-page__field">
							<label htmlFor="applied-status">Status</label>
							<select
								id="applied-status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="">All statuses</option>
								<option value="1">Pending</option>
								<option value="2">Accepted</option>
								<option value="3">Rejected</option>
							</select>
						</div>
						<div className="applied-page__actions">
							<button
								type="button"
								className="applied-page__btn applied-page__btn--primary"
								onClick={handleFilter}
							>
								Apply filter
							</button>
							<button
								type="button"
								className="applied-page__btn applied-page__btn--ghost"
								onClick={handleClear}
							>
								Clear
							</button>
						</div>
					</div>

					{!loading && !error && (
						<p className="applied-page__meta">
							{filteredJobs.length}{" "}
							{filteredJobs.length === 1
								? "application"
								: "applications"}
						</p>
					)}

					{error && (
						<div className="applied-page__error" role="alert">
							<h2>Something went wrong</h2>
							<p>{error}</p>
						</div>
					)}

					{loading && (
						<div className="applied-page__list">
							{Array(4)
								.fill(0)
								.map((_, index) => (
									<div
										className="applied-card applied-card--skeleton"
										key={index}
										aria-hidden="true"
									>
										<span className="applied-card__mark">
											<span
												className="applied-skel"
												style={{
													width: 24,
													height: 24,
													borderRadius: "50%",
												}}
											/>
										</span>
										<div>
											<div
												className="applied-skel"
												style={{
													width: "55%",
													marginBottom: 8,
												}}
											/>
											<div
												className="applied-skel"
												style={{ width: "35%" }}
											/>
										</div>
									</div>
								))}
						</div>
					)}

					{!loading && !error && filteredJobs.length === 0 && (
						<div className="applied-page__empty">
							<h2>No applications found</h2>
							<p>
								{appliedStatus
									? "No applications match this status. Clear the filter to see all."
									: "You have not applied to any jobs yet."}
							</p>
							{!appliedStatus && (
								<Link to="/jobs">Browse open jobs</Link>
							)}
						</div>
					)}

					{!loading && !error && filteredJobs.length > 0 && (
						<div className="applied-page__list">
							{filteredJobs.map((job) => {
								const statusKey = String(
									job.applicant?.status || "",
								);
								const statusLabel =
									STATUS_LABELS[statusKey] || "Submitted";
								const statusClass =
									STATUS_CLASS[statusKey] ||
									"applied-badge--pending";
								const typeLabel =
									TYPE_LABELS[String(job.type)] || "Job";

								return (
									<Link
										className="applied-card"
										to={`/jobs/${job.id}`}
										key={job.id}
									>
										<span
											className="applied-card__mark"
											aria-hidden="true"
										>
											{getInitials(job.company_name)}
										</span>
										<div>
											<h3 className="applied-card__title">
												{job.title}
											</h3>
											<p className="applied-card__company">
												{job.company_name || "Company"}
											</p>
										</div>
										<span className="applied-card__meta">
											<i
												className="lni-map-marker"
												aria-hidden="true"
											/>
											{job.location || "Location n/a"}
										</span>
										<span className="applied-badge applied-badge--type">
											{typeLabel}
										</span>
										<span
											className={`applied-badge ${statusClass}`}
										>
											{statusLabel}
										</span>
									</Link>
								);
							})}
						</div>
					)}
				</div>
			</section>
		</BaseLayout>
	);
};

export default AppliedJobsPage;
