/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import AxiosConfig from "../AxiosConfig";
import dayjs from "dayjs";
import { Link, useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import BaseLayout from "../components/BaseLayout";
import { AuthContext } from "../contexts/AuthContext";
import { IJob } from "../interfaces";
import "../assets/css/job-details.css";

const TYPE_LABELS: Record<string, string> = {
	"1": "Full time",
	"2": "Part time",
	"3": "Internship",
};

const TYPE_CLASS: Record<string, string> = {
	"1": "",
	"2": "is-part",
	"3": "is-intern",
};

const JobDetailsPage = () => {
	const [job, setJob] = useState<IJob | null>(null);
	const [isApplied, setIsApplied] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [applying, setApplying] = useState(false);
	const [copied, setCopied] = useState(false);
	const { id } = useParams<{ id: string }>();
	const authContext = useContext(AuthContext);
	const { token, isAuthenticated, user } = authContext.state;
	const navigate = useNavigate();

	useEffect(() => {
		let active = true;

		const load = async () => {
			setLoading(true);
			setError("");
			try {
				const { data } = await AxiosConfig.get(`jobs/${id}/`);
				if (!active) return;
				setJob(data);

				if (isAuthenticated && token) {
					const config = {
						headers: { Authorization: `Bearer ${token}` },
					};
					try {
						const applied = await AxiosConfig.get(
							`applied-for-job/${id}/`,
							config,
						);
						if (active) setIsApplied(!!applied.data.is_applied);
					} catch {
						if (active) setIsApplied(false);
					}
				} else if (active) {
					setIsApplied(false);
				}
			} catch {
				if (active) {
					setJob(null);
					setError("This job could not be loaded.");
				}
			} finally {
				if (active) setLoading(false);
			}
		};

		load();
		return () => {
			active = false;
		};
	}, [id, isAuthenticated, token]);

	const companyName =
		job?.company?.name || job?.company_name || "Company";
	const initials = companyName
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");

	const typeKey = String(job?.type ?? "");
	const typeLabel = job?.type_display || TYPE_LABELS[typeKey] || "Job";
	const typeClass = TYPE_CLASS[typeKey] || "";
	const pageUrl = typeof window !== "undefined" ? window.location.href : "";
	const canApply =
		!isAuthenticated || (user && user.role === "employee");
	const deadline =
		job?.application_deadline || job?.last_date || null;

	const applyJobHandle = async () => {
		if (!isAuthenticated) {
			navigate("/login");
			return;
		}

		if (user?.role !== "employee") {
			toast.error("Only job seekers can apply for roles");
			return;
		}

		const result = await Swal.fire({
			title: "Apply for this role?",
			text: "You will not be able to withdraw the application from here.",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#26ae61",
			cancelButtonColor: "#5a6b78",
			confirmButtonText: "Yes, apply",
		});

		if (!result.isConfirmed) return;

		setApplying(true);
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		try {
			await AxiosConfig.post(`apply-job/${id}/`, { job: id }, config);
			setIsApplied(true);
			toast.success("Application submitted");
		} catch {
			toast.error("Failed to apply for this job");
		} finally {
			setApplying(false);
		}
	};

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(pageUrl);
			setCopied(true);
			toast.success("Link copied");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy link");
		}
	};

	const pageTitle = job?.title ? `${job.title} | Job details` : "Job details";

	return (
		<BaseLayout title={pageTitle}>
			<section className="job-details-page">
				<div className="container">
					<Link className="job-details-page__back" to="/jobs">
						← Back to jobs
					</Link>

					{loading && (
						<div className="job-details-page__layout">
							<div className="job-details-page__main">
								<div className="jd-panel">
									<div className="jd-skeleton-line" style={{ width: "55%", height: 28 }} />
									<div className="jd-skeleton-line" style={{ width: "30%" }} />
									<div className="jd-skeleton-line" style={{ width: "70%" }} />
								</div>
								<div className="jd-panel">
									<div className="jd-skeleton-line" style={{ width: "40%", height: 20 }} />
									<div className="jd-skeleton-line" />
									<div className="jd-skeleton-line" />
									<div className="jd-skeleton-line" style={{ width: "80%" }} />
								</div>
							</div>
							<div className="job-details-page__aside">
								<div className="jd-panel">
									<div className="jd-skeleton-line" style={{ width: "50%" }} />
									<div className="jd-skeleton-line" />
									<div className="jd-skeleton-line" />
									<div className="jd-skeleton-line" style={{ height: 48 }} />
								</div>
							</div>
						</div>
					)}

					{!loading && error && (
						<div className="jd-state" role="alert">
							<h2>Job not found</h2>
							<p>{error}</p>
						</div>
					)}

					{!loading && !error && job && (
						<div className="job-details-page__layout">
							<div className="job-details-page__main">
								<div className="jd-panel jd-hero">
									<span
										className="jd-hero__mark"
										aria-hidden="true"
									>
										{initials || "JP"}
									</span>
									<div className="jd-hero__body">
										<span
											className={`jd-type ${typeClass}`.trim()}
										>
											{typeLabel}
										</span>
										<h1>{job.title}</h1>
										<p className="jd-hero__company">
											{job.company?.id ? (
												<Link to={`/companies/${job.company.id}`}>
													{companyName}
												</Link>
											) : (
												companyName
											)}
										</p>
										<div className="jd-hero__meta">
											{job.category?.name && (
												<span>
													<i
														className="lni-list"
														aria-hidden="true"
													/>
													{job.category.name}
												</span>
											)}
											{job.location && (
												<span>
													<i
														className="lni-map-marker"
														aria-hidden="true"
													/>
													{job.location}
												</span>
											)}
											{job.created_at && (
												<span>
													<i
														className="lni-calendar"
														aria-hidden="true"
													/>
													Posted{" "}
													{dayjs(
														job.created_at,
													).format("MMM D, YYYY")}
												</span>
											)}
											{job.workplace_type_display && (
												<span>
													{job.workplace_type_display}
												</span>
											)}
											{job.experience_level_display && (
												<span>
													{job.experience_level_display}
												</span>
											)}
										</div>
									</div>
								</div>

								<div className="jd-panel jd-section">
									<h2>Job description</h2>
									<p>
										{job.description ||
											"No description provided for this role."}
									</p>
									{job.job_tags && job.job_tags.length > 0 && (
										<div className="jd-tags">
											{job.job_tags.map((tag) => (
												<span
													className="jd-tag"
													key={tag.id}
												>
													{tag.name}
												</span>
											))}
										</div>
									)}
								</div>

								{job.responsibilities && (
									<div className="jd-panel jd-section">
										<h2>Responsibilities</h2>
										<p>{job.responsibilities}</p>
									</div>
								)}

								{job.requirements && (
									<div className="jd-panel jd-section">
										<h2>Requirements</h2>
										<p>{job.requirements}</p>
									</div>
								)}

								{(job.company?.description ||
									job.company_description) && (
									<div className="jd-panel jd-section jd-company">
										<h2>About the company</h2>
										<p>
											{job.company?.description ||
												job.company_description}
										</p>
										{job.company?.id && (
											<Link
												to={`/companies/${job.company.id}`}
											>
												View company profile
											</Link>
										)}
										{(job.company?.website ||
											job.website) && (
											<a
												href={(
													job.company?.website ||
													job.website ||
													""
												).startsWith("http")
													? job.company?.website ||
														job.website ||
														"#"
													: `https://${
															job.company
																?.website ||
															job.website
														}`}
												target="_blank"
												rel="noreferrer"
												style={{
													display: "block",
													marginTop: 10,
												}}
											>
												Visit website
											</a>
										)}
									</div>
								)}
							</div>

							<aside className="job-details-page__aside">
								<div className="jd-panel">
									{job.salary != null &&
										Number(job.salary) > 0 && (
											<div className="jd-salary">
												<span className="jd-salary__label">
													Salary
												</span>
												<span className="jd-salary__value">
													{Number(
														job.salary,
													).toLocaleString()}{" "}
													{job.salary_currency ||
														"BDT"}
												</span>
											</div>
										)}

									<h3 className="jd-aside__title">
										Job details
									</h3>
									<ul className="jd-facts">
										<li>
											<span className="label">Type</span>
											<span className="value">
												{typeLabel}
											</span>
										</li>
										{job.category?.name && (
											<li>
												<span className="label">
													Category
												</span>
												<span className="value">
													{job.category.id ? (
														<Link
															to={`/jobs?category=${job.category.id}`}
														>
															{job.category.name}
														</Link>
													) : (
														job.category.name
													)}
												</span>
											</li>
										)}
										{job.location && (
											<li>
												<span className="label">
													Location
												</span>
												<span className="value">
													{job.location}
												</span>
											</li>
										)}
										{job.workplace_type_display && (
											<li>
												<span className="label">
													Workplace
												</span>
												<span className="value">
													{
														job.workplace_type_display
													}
												</span>
											</li>
										)}
										{deadline && (
											<li>
												<span className="label">
													Apply by
												</span>
												<span className="value">
													{dayjs(deadline).format(
														"MMM D, YYYY",
													)}
												</span>
											</li>
										)}
										{job.experience_level_display && (
											<li>
												<span className="label">
													Experience
												</span>
												<span className="value">
													{
														job.experience_level_display
													}
												</span>
											</li>
										)}
									</ul>

									{canApply && (
										<>
											{isApplied ? (
												<button
													type="button"
													className="jd-apply is-done"
													disabled
												>
													Already applied
												</button>
											) : (
												<button
													type="button"
													className="jd-apply"
													onClick={applyJobHandle}
													disabled={applying}
												>
													{applying
														? "Applying..."
														: isAuthenticated
															? "Apply for this job"
															: "Sign in to apply"}
												</button>
											)}
											{!isAuthenticated && (
												<p className="jd-apply-note">
													You need a job seeker
													account to submit an
													application.
												</p>
											)}
										</>
									)}
								</div>

								<div className="jd-panel">
									<h3 className="jd-aside__title">
										Share this job
									</h3>
									<div className="jd-share">
										<input
											type="text"
											readOnly
											value={pageUrl}
											aria-label="Job link"
										/>
										<button type="button" onClick={copyLink}>
											{copied ? "Copied" : "Copy"}
										</button>
									</div>
								</div>
							</aside>
						</div>
					)}
				</div>
			</section>
		</BaseLayout>
	);
};

export default JobDetailsPage;
