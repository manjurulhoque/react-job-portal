/* eslint-disable */
import React, { useEffect, useState, useContext, FC, FormEvent } from "react";
import { Link, Navigate } from "react-router";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import toast from "react-hot-toast";
import BaseLayout from "../../components/BaseLayout";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import AxiosConfig from "../../AxiosConfig";
import { AuthContext } from "../../contexts/AuthContext";
import { ICompany, ITag } from "../../interfaces";
import "../../assets/css/employer.css";

interface Option {
	label: string;
	value: string | number;
}

const JOB_TYPES: Option[] = [
	{ value: "1", label: "Full time" },
	{ value: "2", label: "Part time" },
	{ value: "3", label: "Internship" },
];

const WORKPLACE_TYPES: Option[] = [
	{ value: "on_site", label: "On-site" },
	{ value: "remote", label: "Remote" },
	{ value: "hybrid", label: "Hybrid" },
];

const EXPERIENCE_LEVELS: Option[] = [
	{ value: "entry", label: "Entry level" },
	{ value: "mid", label: "Mid level" },
	{ value: "senior", label: "Senior level" },
	{ value: "lead", label: "Lead/Staff" },
];

const SALARY_PERIODS: Option[] = [
	{ value: "month", label: "Per month" },
	{ value: "year", label: "Per year" },
	{ value: "hour", label: "Per hour" },
];

const JOB_STATUSES: Option[] = [
	{ value: "published", label: "Published" },
	{ value: "draft", label: "Draft" },
	{ value: "closed", label: "Closed" },
];

const CURRENCIES: Option[] = [
	{ value: "BDT", label: "BDT" },
	{ value: "USD", label: "USD" },
	{ value: "EUR", label: "EUR" },
	{ value: "GBP", label: "GBP" },
	{ value: "INR", label: "INR" },
];

const PostJobPage: FC = () => {
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const config = { headers: { Authorization: `Bearer ${token}` } };

	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [companies, setCompanies] = useState<Option[]>([]);
	const [tags, setTags] = useState<Option[]>([]);

	const [company, setCompany] = useState<number | "">("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [responsibilities, setResponsibilities] = useState("");
	const [requirements, setRequirements] = useState("");
	const [location, setLocation] = useState("");
	const [type, setType] = useState<string>("1");
	const [workplace_type, setWorkplaceType] = useState("on_site");
	const [experience_level, setExperienceLevel] = useState("entry");
	const [application_deadline, setApplicationDeadline] = useState<
		Date | undefined
	>();
	const [website, setWebsite] = useState("");
	const [status, setStatus] = useState("published");
	const [salary, setSalary] = useState<number | "">("");
	const [salary_min, setSalaryMin] = useState<number | "">("");
	const [salary_max, setSalaryMax] = useState<number | "">("");
	const [salary_currency, setSalaryCurrency] = useState("BDT");
	const [salary_period, setSalaryPeriod] = useState("month");
	const [job_tags, setJobTags] = useState<(string | number)[]>([]);
	const [vacancy, setVacancy] = useState<number | "">(1);
	const [is_featured, setIsFeatured] = useState(false);

	useEffect(() => {
		Promise.all([
			AxiosConfig.get<ICompany[]>("employer/companies/", config),
			AxiosConfig.get("tags/"),
		])
			.then(([companiesRes, tagsRes]) => {
				const companyList = Array.isArray(companiesRes.data)
					? companiesRes.data
					: (companiesRes.data as any).results || [];
				setCompanies(
					companyList.map((item: ICompany) => ({
						value: item.id,
						label: item.name,
					})),
				);
				const tagList = Array.isArray(tagsRes.data)
					? tagsRes.data
					: (tagsRes.data as any).results || [];
				setTags(
					tagList.map((tag: ITag) => ({
						value: tag.id,
						label: tag.name,
					})),
				);
			})
			.catch(() => toast.error("Failed to load form data"))
			.finally(() => setLoading(false));
	}, []);

	const toggleTag = (value: string | number) => {
		setJobTags((prev) =>
			prev.includes(value)
				? prev.filter((item) => item !== value)
				: [...prev, value],
		);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (submitted) return;
		if (!company) {
			toast.error("Select a company profile");
			return;
		}
		if (!application_deadline) {
			toast.error("Set an application deadline");
			return;
		}

		setSubmitted(true);
		const payload = {
			company,
			title,
			description,
			responsibilities,
			requirements,
			location,
			type,
			workplace_type,
			experience_level,
			application_deadline,
			website: website || null,
			status,
			salary: salary === "" ? 0 : salary,
			salary_min: salary_min === "" ? null : salary_min,
			salary_max: salary_max === "" ? null : salary_max,
			salary_currency,
			salary_period,
			tags: job_tags,
			vacancy: vacancy === "" ? 1 : vacancy,
			is_featured,
		};

		AxiosConfig.post("employer/jobs/create/", payload, config)
			.then(() => {
				toast.success("Job posted successfully");
				setRedirect(true);
			})
			.catch((err) => {
				const data = err?.response?.data;
				const message =
					typeof data === "object"
						? Object.values(data).flat().join(" ")
						: "Something went wrong";
				toast.error(message || "Something went wrong");
			})
			.finally(() => setSubmitted(false));
	};

	if (redirect) {
		return <Navigate to="/employer/dashboard/" replace />;
	}

	return (
		<BaseLayout title={"Post new job"}>
			<EmployerSidebarLayout
				title="Post a job"
				subtitle="Create a role under one of your company profiles."
				action={
					<Link
						className="employer-head__cta"
						to="/employer/companies/"
					>
						Manage companies
					</Link>
				}
			>
				<div className="employer-panel post-job-page__panel">
					{loading ? (
						<div className="employer-loading">
							<div className="employer-skel" />
							<div
								className="employer-skel"
								style={{ width: "80%" }}
							/>
						</div>
					) : companies.length === 0 ? (
						<div className="employer-empty">
							<h2>Create a company first</h2>
							<p>
								Jobs must be linked to a company profile you
								own.
							</p>
							<Link
								className="employer-link"
								to="/employer/companies/"
							>
								Add company
							</Link>
						</div>
					) : (
						<form
							className="post-job-form"
							onSubmit={handleSubmit}
						>
							<div className="form-group">
								<label htmlFor="job-company">Company</label>
								<select
									id="job-company"
									value={company}
									onChange={(e) =>
										setCompany(
											e.target.value === ""
												? ""
												: Number(e.target.value),
										)
									}
									required
								>
									<option value="">Select company</option>
									{companies.map((item) => (
										<option
											key={item.value}
											value={item.value}
										>
											{item.label}
										</option>
									))}
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="job-title">Job title</label>
								<input
									id="job-title"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
									placeholder="e.g. Frontend developer"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="job-description">
									Description
								</label>
								<textarea
									id="job-description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									required
									rows={5}
									placeholder="Role overview"
								/>
							</div>

							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="job-responsibilities">
										Responsibilities
									</label>
									<textarea
										id="job-responsibilities"
										value={responsibilities}
										onChange={(e) =>
											setResponsibilities(e.target.value)
										}
										rows={4}
										placeholder="Day-to-day work"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="job-requirements">
										Requirements
									</label>
									<textarea
										id="job-requirements"
										value={requirements}
										onChange={(e) =>
											setRequirements(e.target.value)
										}
										rows={4}
										placeholder="Skills and experience"
									/>
								</div>
							</div>

							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="job-location">
										Location
									</label>
									<input
										id="job-location"
										type="text"
										value={location}
										onChange={(e) =>
											setLocation(e.target.value)
										}
										required
										placeholder="e.g. Dhaka or Remote"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="job-deadline">
										Application deadline
									</label>
									<Flatpickr
										id="job-deadline"
										className="form-control"
										value={application_deadline}
										options={{ minDate: new Date() }}
										onChange={(date) =>
											setApplicationDeadline(date[0])
										}
										placeholder="Select date"
									/>
								</div>
							</div>

							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="job-type">Type</label>
									<select
										id="job-type"
										value={type}
										onChange={(e) =>
											setType(e.target.value)
										}
									>
										{JOB_TYPES.map((item) => (
											<option
												key={item.value}
												value={item.value}
											>
												{item.label}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="job-workplace">
										Workplace
									</label>
									<select
										id="job-workplace"
										value={workplace_type}
										onChange={(e) =>
											setWorkplaceType(e.target.value)
										}
									>
										{WORKPLACE_TYPES.map((item) => (
											<option
												key={item.value}
												value={item.value}
											>
												{item.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="job-experience">
										Experience level
									</label>
									<select
										id="job-experience"
										value={experience_level}
										onChange={(e) =>
											setExperienceLevel(e.target.value)
										}
									>
										{EXPERIENCE_LEVELS.map((item) => (
											<option
												key={item.value}
												value={item.value}
											>
												{item.label}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="job-status">Status</label>
									<select
										id="job-status"
										value={status}
										onChange={(e) =>
											setStatus(e.target.value)
										}
									>
										{JOB_STATUSES.map((item) => (
											<option
												key={item.value}
												value={item.value}
											>
												{item.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="form-row-pair">
								<div className="form-group">
									<span
										className="post-job-form__field-label"
										id="job-skills-label"
									>
										Tags
									</span>
									{tags.length === 0 ? (
										<p className="post-job-form__empty-hint">
											No tags available yet.
										</p>
									) : (
										<div
											className="post-job-form__chips"
											role="group"
											aria-labelledby="job-skills-label"
										>
											{tags.map((item) => {
												const selected =
													job_tags.includes(
														item.value,
													);
												return (
													<label
														key={item.value}
														className={`post-job-form__chip${
															selected
																? " is-selected"
																: ""
														}`}
													>
														<input
															type="checkbox"
															checked={selected}
															onChange={() =>
																toggleTag(
																	item.value,
																)
															}
														/>
														{item.label}
													</label>
												);
											})}
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="job-vacancy">
										Vacancies
									</label>
									<input
										id="job-vacancy"
										type="number"
										min={1}
										value={vacancy}
										onChange={(e) =>
											setVacancy(
												e.target.value === ""
													? ""
													: Number(e.target.value),
											)
										}
									/>
								</div>
							</div>

							<div className="post-job-form__section">
								<h2>Compensation</h2>
								<div className="form-row-pair">
									<div className="form-group">
										<label htmlFor="job-salary">
											Salary
										</label>
										<input
											id="job-salary"
											type="number"
											value={salary}
											onChange={(e) =>
												setSalary(
													e.target.value === ""
														? ""
														: Number(e.target.value),
												)
											}
											placeholder="Base amount"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="job-currency">
											Currency
										</label>
										<select
											id="job-currency"
											value={salary_currency}
											onChange={(e) =>
												setSalaryCurrency(
													e.target.value,
												)
											}
										>
											{CURRENCIES.map((item) => (
												<option
													key={item.value}
													value={item.value}
												>
													{item.label}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className="form-row-pair">
									<div className="form-group">
										<label htmlFor="job-salary-min">
											Min salary
										</label>
										<input
											id="job-salary-min"
											type="number"
											value={salary_min}
											onChange={(e) =>
												setSalaryMin(
													e.target.value === ""
														? ""
														: Number(e.target.value),
												)
											}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="job-salary-max">
											Max salary
										</label>
										<input
											id="job-salary-max"
											type="number"
											value={salary_max}
											onChange={(e) =>
												setSalaryMax(
													e.target.value === ""
														? ""
														: Number(e.target.value),
												)
											}
										/>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="job-period">
										Salary period
									</label>
									<select
										id="job-period"
										value={salary_period}
										onChange={(e) =>
											setSalaryPeriod(e.target.value)
										}
									>
										{SALARY_PERIODS.map((item) => (
											<option
												key={item.value}
												value={item.value}
											>
												{item.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="job-website">
									External apply URL{" "}
									<span className="hint">(optional)</span>
								</label>
								<input
									id="job-website"
									type="url"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									placeholder="https://company.com/careers/role"
								/>
							</div>

							<label
								className={`post-job-form__option${
									is_featured ? " is-checked" : ""
								}`}
							>
								<input
									id="job-featured"
									type="checkbox"
									checked={is_featured}
									onChange={(e) =>
										setIsFeatured(e.target.checked)
									}
								/>
								<span
									className="post-job-form__option-box"
									aria-hidden="true"
								>
									<svg
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M3.5 8.5L6.5 11.5L12.5 4.5"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<span className="post-job-form__option-copy">
									<span className="post-job-form__option-title">
										Feature this job
									</span>
									<span className="post-job-form__option-hint">
										Show this listing higher in search
										results
									</span>
								</span>
							</label>

							<button
								type="submit"
								className="post-job-form__submit"
								disabled={submitted}
							>
								{submitted ? (
									<>
										<span
											className="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										/>
										Posting...
									</>
								) : (
									"Post job"
								)}
							</button>
						</form>
					)}
				</div>
			</EmployerSidebarLayout>
		</BaseLayout>
	);
};

export default PostJobPage;
