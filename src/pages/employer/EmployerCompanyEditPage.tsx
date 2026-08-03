/* eslint-disable */
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import AxiosConfig from "../../AxiosConfig";
import BaseLayout from "../../components/BaseLayout";
import EmployerSidebarLayout from "../../components/employer-dashboard/EmployerSidebarLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { ICompany } from "../../interfaces";
import "../../assets/css/employer.css";

const SIZE_OPTIONS = [
	{ value: "", label: "Select size" },
	{ value: "1", label: "1-10 employees" },
	{ value: "2", label: "11-50 employees" },
	{ value: "3", label: "51-200 employees" },
	{ value: "4", label: "201-500 employees" },
	{ value: "5", label: "501-1000 employees" },
	{ value: "6", label: "1000+ employees" },
];

const EmployerCompanyEditPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const config = { headers: { Authorization: `Bearer ${token}` } };

	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
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
	});

	useEffect(() => {
		AxiosConfig.get<ICompany>(`employer/companies/${id}/`, config)
			.then((res) => {
				const c = res.data;
				setForm({
					name: c.name || "",
					tagline: c.tagline || "",
					description: c.description || "",
					website: c.website || "",
					industry: c.industry || "",
					headquarters: c.headquarters || "",
					size: c.size || "",
					culture_benefits: c.culture_benefits || "",
					linkedin_url: c.linkedin_url || "",
					facebook_url: c.facebook_url || "",
				});
			})
			.catch(() => {
				toast.error("Company not found");
				navigate("/employer/companies/");
			})
			.finally(() => setLoading(false));
	}, [id]);

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
		AxiosConfig.patch(`employer/companies/${id}/`, form, config)
			.then(() => {
				toast.success("Company updated");
				navigate("/employer/companies/");
			})
			.catch((err) => {
				const data = err?.response?.data;
				const message =
					typeof data === "object"
						? Object.values(data).flat().join(" ")
						: "Failed to update company";
				toast.error(message || "Failed to update company");
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<BaseLayout title="Edit company">
			<EmployerSidebarLayout
				title="Edit company"
				subtitle="Update your company profile details."
				action={
					<Link
						className="employer-head__cta"
						to="/employer/companies/"
					>
						Back
					</Link>
				}
			>
				<div className="employer-panel post-job-page__panel">
					{loading ? (
						<div className="employer-loading">
							<div className="employer-skel" />
						</div>
					) : (
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
								<label htmlFor="facebook_url">
									Facebook URL
								</label>
								<input
									id="facebook_url"
									name="facebook_url"
									type="url"
									value={form.facebook_url}
									onChange={onChange}
								/>
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
								{submitting ? "Saving..." : "Save changes"}
							</button>
						</form>
					)}
				</div>
			</EmployerSidebarLayout>
		</BaseLayout>
	);
};

export default EmployerCompanyEditPage;
