/* eslint-disable */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AxiosConfig from "../AxiosConfig";
import BaseLayout from "../components/BaseLayout";
import JobItem from "../components/job/JobItem";
import { ICompany, IJob, IPaginated } from "../interfaces";
import "../assets/css/companies.css";

const initials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");

const CompanyDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const [company, setCompany] = useState<ICompany | null>(null);
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		setLoading(true);

		Promise.all([
			AxiosConfig.get<ICompany>(`companies/${id}/`),
			AxiosConfig.get<IPaginated<IJob> | IJob[]>("jobs/", {
				params: { company: id, page: 1 },
			}),
		])
			.then(([companyRes, jobsRes]) => {
				if (!active) return;
				setCompany(companyRes.data);
				const jobsData = jobsRes.data;
				setJobs(
					Array.isArray(jobsData)
						? jobsData
						: jobsData.results || [],
				);
				setError("");
			})
			.catch(() => {
				if (!active) return;
				setCompany(null);
				setJobs([]);
				setError("Company could not be loaded.");
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, [id]);

	return (
		<BaseLayout
			title={company?.name ? `${company.name} | Company` : "Company"}
		>
			<section className="company-details-page">
				<div className="container">
					<Link className="job-details-page__back" to="/companies">
						← Back to companies
					</Link>

					{loading && (
						<div className="company-hero">
							<div className="employer-skel" />
							<div
								className="employer-skel"
								style={{ width: "50%" }}
							/>
						</div>
					)}

					{!loading && error && (
						<div className="companies-error" role="alert">
							{error}
						</div>
					)}

					{!loading && !error && company && (
						<>
							<div className="company-hero">
								{company.cover_image && (
									<img
										className="company-hero__cover"
										src={company.cover_image}
										alt=""
									/>
								)}
								<div className="company-hero__row">
									{company.logo ? (
										<img
											className="company-hero__logo"
											src={company.logo}
											alt=""
										/>
									) : (
										<span
											className="company-hero__mark"
											aria-hidden="true"
										>
											{initials(company.name) || "C"}
										</span>
									)}
									<div>
										{company.featured && (
											<span className="company-chip company-chip--featured">
												Featured
											</span>
										)}
										<h1>{company.name}</h1>
										{company.tagline && (
											<p className="company-hero__tagline">
												{company.tagline}
											</p>
										)}
										<div className="company-hero__facts">
											{company.industry && (
												<span>{company.industry}</span>
											)}
											{company.headquarters && (
												<span>
													{company.headquarters}
												</span>
											)}
											{company.size_display && (
												<span>
													{company.size_display}
												</span>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="company-details-page__layout">
								<div>
									<div className="company-panel" style={{ marginBottom: 16 }}>
										<h2>About</h2>
										<p>
											{company.description ||
												"No company description yet."}
										</p>
									</div>

									{company.culture_benefits && (
										<div
											className="company-panel"
											style={{ marginBottom: 16 }}
										>
											<h2>Culture and benefits</h2>
											<p>{company.culture_benefits}</p>
										</div>
									)}

									<div className="company-panel">
										<h2>Open roles</h2>
										{jobs.length === 0 ? (
											<p>No open roles right now.</p>
										) : (
											<div className="company-jobs">
												{jobs.map((job) => (
													<JobItem
														job={job}
														key={job.id}
													/>
												))}
											</div>
										)}
									</div>
								</div>

								<aside className="company-panel">
									<h2>Links</h2>
									{company.website ? (
										<p>
											<a
												href={company.website}
												target="_blank"
												rel="noreferrer"
											>
												Website
											</a>
										</p>
									) : (
										<p>No website listed.</p>
									)}
									{company.linkedin_url && (
										<p style={{ marginTop: 10 }}>
											<a
												href={company.linkedin_url}
												target="_blank"
												rel="noreferrer"
											>
												LinkedIn
											</a>
										</p>
									)}
									{company.facebook_url && (
										<p style={{ marginTop: 10 }}>
											<a
												href={company.facebook_url}
												target="_blank"
												rel="noreferrer"
											>
												Facebook
											</a>
										</p>
									)}
								</aside>
							</div>
						</>
					)}
				</div>
			</section>
		</BaseLayout>
	);
};

export default CompanyDetailsPage;
