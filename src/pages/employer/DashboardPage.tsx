/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import BaseLayout from "../../components/BaseLayout";
import AxiosConfig from "../../AxiosConfig";
import { AuthContext } from "../../contexts/AuthContext";
import { IJob } from "../../interfaces";

const TYPE_LABELS: Record<string, string> = {
	"1": "Full time",
	"2": "Part time",
	"3": "Internship",
};

const DashboardPage = () => {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		AxiosConfig.get("employer/dashboard/", config)
			.then((res) => {
				setJobs(res.data || []);
				setError("");
			})
			.catch(() => setError("Failed to load your jobs."))
			.finally(() => setLoading(false));
	}, [token]);

	return (
		<BaseLayout title={"Dashboard"}>
			<EmployerSidebarLayout
				title="Manage jobs"
				subtitle="Review openings you posted and jump into applicants for each role."
				action={
					<Link className="employer-head__cta" to="/post-job">
						Post a job
					</Link>
				}
			>
				<div className="employer-panel">
					{loading && (
						<div className="employer-loading" aria-hidden="true">
							<div className="employer-skel" />
							<div className="employer-skel" style={{ width: "70%" }} />
							<div className="employer-skel" style={{ width: "55%" }} />
						</div>
					)}

					{!loading && error && (
						<div className="employer-error" role="alert">
							<h2>Something went wrong</h2>
							<p>{error}</p>
						</div>
					)}

					{!loading && !error && jobs.length === 0 && (
						<div className="employer-empty">
							<h2>No jobs posted yet</h2>
							<p>Create your first opening to start receiving applicants.</p>
						</div>
					)}

					{!loading && !error && jobs.length > 0 && (
						<>
							<div className="employer-table-head employer-row--jobs">
								<span>Job</span>
								<span>Type</span>
								<span>Tags</span>
								<span>Candidates</span>
							</div>
							{jobs.map((job) => (
								<div
									className="employer-row employer-row--jobs"
									key={job.id}
								>
									<div>
										<h3 className="employer-job__title">
											<Link to={`/jobs/${job.id}`}>
												{job.title}
											</Link>
										</h3>
										<p className="employer-job__meta">
											<i
												className="lni-map-marker"
												aria-hidden="true"
											/>
											{job.location || "Location n/a"}
										</p>
									</div>
									<div>
										<span className="employer-badge employer-badge--type">
											{TYPE_LABELS[String(job.type)] ||
												"Job"}
										</span>
									</div>
									<div className="employer-tags">
										{job.job_tags?.length
											? job.job_tags.map((tag) => (
													<span
														className="employer-tag"
														key={tag.id}
													>
														{tag.name}
													</span>
												))
											: (
												<span className="employer-job__meta">
													No tags
												</span>
											)}
									</div>
									<div>
										<Link
											className="employer-link"
											to={`/employer/applicants/${job.id}`}
										>
											{job.total_candidates ?? 0}{" "}
											{(job.total_candidates ?? 0) === 1
												? "candidate"
												: "candidates"}
										</Link>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			</EmployerSidebarLayout>
		</BaseLayout>
	);
};

export default DashboardPage;
