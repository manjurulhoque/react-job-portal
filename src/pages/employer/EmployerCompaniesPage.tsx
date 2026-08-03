/* eslint-disable */
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import AxiosConfig from "../../AxiosConfig";
import BaseLayout from "../../components/BaseLayout";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { ICompany } from "../../interfaces";
import "../../assets/css/employer.css";
import "../../assets/css/companies.css";

const SIZE_OPTIONS = [
	{ value: "", label: "Select size" },
	{ value: "1", label: "1-10 employees" },
	{ value: "2", label: "11-50 employees" },
	{ value: "3", label: "51-200 employees" },
	{ value: "4", label: "201-500 employees" },
	{ value: "5", label: "501-1000 employees" },
	{ value: "6", label: "1000+ employees" },
];

const emptyForm = {
	name: "",
	tagline: "",
	description: "",
	website: "",
	industry: "",
	headquarters: "",
	size: "",
	culture_benefits: "",
	linkedin_url: "",
	facebook_url: "",
};

const EmployerCompaniesPage = () => {
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const config = { headers: { Authorization: `Bearer ${token}` } };

	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState(emptyForm);

	const loadCompanies = () => {
		setLoading(true);
		AxiosConfig.get("employer/companies/", config)
			.then((res) => {
				const data = res.data;
				setCompanies(Array.isArray(data) ? data : data.results || []);
			})
			.catch(() => toast.error("Failed to load companies"))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		loadCompanies();
	}, []);

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (submitting) return;
		setSubmitting(true);

		AxiosConfig.post("employer/companies/", form, config)
			.then(() => {
				toast.success("Company created");
				setForm(emptyForm);
				setShowForm(false);
				loadCompanies();
			})
			.catch((err) => {
				const data = err?.response?.data;
				const message =
					typeof data === "object"
						? Object.values(data).flat().join(" ")
						: "Failed to create company";
				toast.error(message || "Failed to create company");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<BaseLayout title="My companies">
			<EmployerSidebarLayout
				title="Companies"
				subtitle="Manage company profiles used when posting jobs."
				action={
					<button
						type="button"
						className="employer-head__cta"
						onClick={() => setShowForm((v) => !v)}
						style={{ border: "none" }}
					>
						{showForm ? "Close form" : "Add company"}
					</button>
				}
			>
				{showForm && (
					<div
						className="employer-panel post-job-page__panel"
						style={{ marginBottom: 16 }}
					>
						<form className="post-job-form" onSubmit={onSubmit}>
							<div className="form-group">
								<label htmlFor="name">Company name</label>
								<input
									id="name"
									name="name"
									value={form.name}
									onChange={onChange}
									required
								/>
							</div>
							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="tagline">Tagline</label>
									<input
										id="tagline"
										name="tagline"
										value={form.tagline}
										onChange={onChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="industry">Industry</label>
									<input
										id="industry"
										name="industry"
										value={form.industry}
										onChange={onChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									id="description"
									name="description"
									rows={4}
									value={form.description}
									onChange={onChange}
								/>
							</div>
							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="website">Website</label>
									<input
										id="website"
										name="website"
										type="url"
										value={form.website}
										onChange={onChange}
										placeholder="https://"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="headquarters">
										Headquarters
									</label>
									<input
										id="headquarters"
										name="headquarters"
										value={form.headquarters}
										onChange={onChange}
									/>
								</div>
							</div>
							<div className="form-row-pair">
								<div className="form-group">
									<label htmlFor="size">Company size</label>
									<select
										id="size"
										name="size"
										value={form.size}
										onChange={onChange}
									>
										{SIZE_OPTIONS.map((opt) => (
											<option
												key={opt.value || "none"}
												value={opt.value}
											>
												{opt.label}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="linkedin_url">
										LinkedIn URL
									</label>
									<input
										id="linkedin_url"
										name="linkedin_url"
										type="url"
										value={form.linkedin_url}
										onChange={onChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="culture_benefits">
									Culture and benefits
								</label>
								<textarea
									id="culture_benefits"
									name="culture_benefits"
									rows={3}
									value={form.culture_benefits}
									onChange={onChange}
								/>
							</div>
							<button
								type="submit"
								className="post-job-form__submit"
								disabled={submitting}
							>
								{submitting ? "Saving..." : "Create company"}
							</button>
						</form>
					</div>
				)}

				<div className="employer-panel">
					{loading && (
						<div className="employer-loading">
							<div className="employer-skel" />
							<div
								className="employer-skel"
								style={{ width: "70%" }}
							/>
						</div>
					)}

					{!loading && companies.length === 0 && (
						<div className="employer-empty">
							<h2>No companies yet</h2>
							<p>Create a company profile before posting jobs.</p>
						</div>
					)}

					{!loading &&
						companies.map((company) => (
							<div
								className="employer-row employer-row--jobs"
								key={company.id}
								style={{
									gridTemplateColumns: "1fr auto auto",
								}}
							>
								<div>
									<h3 className="employer-job__title">
										{company.name}
									</h3>
									<p className="employer-job__meta">
										{[company.industry, company.headquarters]
											.filter(Boolean)
											.join(" · ") || "No details yet"}
									</p>
								</div>
								<span className="employer-badge employer-badge--type">
									{company.size_display || "Size n/a"}
								</span>
								<div style={{ display: "flex", gap: 10 }}>
									<Link
										className="employer-link"
										to={`/companies/${company.id}`}
									>
										View
									</Link>
									<Link
										className="employer-link"
										to={`/employer/companies/${company.id}`}
									>
										Edit
									</Link>
								</div>
							</div>
						))}
				</div>
			</EmployerSidebarLayout>
		</BaseLayout>
	);
};

export default EmployerCompaniesPage;
