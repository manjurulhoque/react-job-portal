/* eslint-disable */
import React, { useEffect, useState, useContext, FC, FormEvent } from "react";
import BaseLayout from "../../components/BaseLayout";
import AxiosConfig from "../../AxiosConfig";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router";
import { ITag } from "../../interfaces";
import toast from "react-hot-toast";
import "../../assets/css/employer.css";

interface ICustomTag {
	label: string;
	value: string | number;
}

const animatedComponents = makeAnimated();

const selectStyles = {
	control: () => ({}),
	valueContainer: (base: object) => ({ ...base, padding: "2px 10px" }),
	indicatorsContainer: (base: object) => ({ ...base, paddingRight: 8 }),
};

const PostJobPage: FC = () => {
	const [tags, setTags] = useState<ICustomTag[]>([]);
	const types = [
		{ value: 1, label: "Full time" },
		{ value: 2, label: "Part time" },
		{ value: 3, label: "Internship" },
	];
	const categories = [
		{ value: "web-design", label: "Web design" },
		{ value: "graphic-design", label: "Graphic design" },
		{ value: "web-development", label: "Web development" },
		{ value: "human-resource", label: "Human Resources" },
		{ value: "support", label: "Support" },
		{ value: "android", label: "Android Development" },
	];
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [salary, setSalary] = useState<number | "">("");
	const [job_tags, setJobTags] = useState<(string | number)[]>([]);
	const [location, setLocation] = useState("");
	const [type, setType] = useState<string | number>("");
	const [category, setCategory] = useState("");
	const [last_date, setLastDate] = useState<Date | undefined>();
	const [company_name, setCompanyName] = useState("");
	const [company_description, setCompanyDescription] = useState("");
	const [website, setWebsite] = useState("");
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		AxiosConfig.get("tags/")
			.then((res) => {
				const my_tags: ICustomTag[] = res.data.map((tag: ITag) => ({
					value: tag.id,
					label: tag.name,
				}));
				setTags(my_tags);
			})
			.catch(() => toast.error("Failed to load tags"))
			.finally(() => setLoading(false));
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (submitted) return;

		setSubmitted(true);
		const new_job_data = {
			title,
			description,
			tags: job_tags,
			salary: salary === "" ? undefined : salary,
			location,
			type,
			category,
			last_date,
			company_name,
			company_description,
			website,
		};

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		AxiosConfig.post(`employer/jobs/create/`, new_job_data, config)
			.then(() => {
				toast.success("Job posted successfully");
				setRedirect(true);
			})
			.catch(() => toast.error("Something went wrong"))
			.finally(() => setSubmitted(false));
	};

	const handleSkillsChange = (selectedOptions: any) => {
		const values = (selectedOptions || []).map(
			(selected: ICustomTag) => selected.value,
		);
		setJobTags(values);
	};

	if (redirect) {
		return <Navigate to="/employer/dashboard/" replace />;
	}

	return (
		<BaseLayout title={"Post new job"}>
			<section className="post-job-page">
				<div className="container">
					<div className="post-job-page__panel">
						<div className="post-job-page__head">
							<h1>Post a job</h1>
							<p>
								Share the role details employers and seekers
								need to move quickly.
							</p>
						</div>

						{loading ? (
							<div className="employer-loading">
								<div className="employer-skel" />
								<div
									className="employer-skel"
									style={{ width: "80%" }}
								/>
								<div
									className="employer-skel"
									style={{ width: "65%" }}
								/>
							</div>
						) : (
							<form
								className="post-job-form"
								onSubmit={handleSubmit}
							>
								<div className="form-group">
									<label htmlFor="job-title">Job title</label>
									<input
										id="job-title"
										type="text"
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										required
										placeholder="e.g. Frontend developer"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="job-description">
										Job description
									</label>
									<textarea
										id="job-description"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										required
										rows={5}
										placeholder="Describe responsibilities, requirements, and benefits"
									/>
								</div>

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
														: Number(
																e.target.value,
															),
												)
											}
											placeholder="Amount in Tk"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="job-skills">
											Required skills
										</label>
										<Select
											inputId="job-skills"
											closeMenuOnSelect={false}
											components={animatedComponents}
											isMulti
											options={tags}
											classNamePrefix="jp-select"
											styles={selectStyles}
											onChange={handleSkillsChange}
											placeholder="Select skills"
										/>
									</div>
								</div>

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

								<div className="form-row-pair">
									<div className="form-group">
										<label htmlFor="job-type">Type</label>
										<Select
											inputId="job-type"
											classNamePrefix="jp-select"
											styles={selectStyles}
											name="type"
											options={types}
											onChange={(option: any) =>
												setType(option?.value)
											}
											placeholder="Select type"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="job-category">
											Category
										</label>
										<Select
											inputId="job-category"
											classNamePrefix="jp-select"
											styles={selectStyles}
											name="category"
											options={categories}
											onChange={(option: any) =>
												setCategory(option?.value)
											}
											placeholder="Select category"
										/>
									</div>
								</div>

								<div className="form-row-pair">
									<div className="form-group">
										<label htmlFor="job-website">
											Website{" "}
											<span className="hint">
												(optional)
											</span>
										</label>
										<input
											id="job-website"
											type="text"
											value={website}
											onChange={(e) =>
												setWebsite(e.target.value)
											}
											placeholder="https://company.com"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="job-deadline">
											Application deadline
										</label>
										<Flatpickr
											id="job-deadline"
											className="form-control"
											value={last_date}
											options={{
												minDate: new Date(),
											}}
											onChange={(date) =>
												setLastDate(date[0])
											}
											placeholder="Select date"
										/>
									</div>
								</div>

								<div className="post-job-form__section">
									<h2>Company details</h2>
									<div className="form-group">
										<label htmlFor="company-name">
											Company name
										</label>
										<input
											id="company-name"
											type="text"
											value={company_name}
											onChange={(e) =>
												setCompanyName(e.target.value)
											}
											required
											placeholder="Company name"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="company-description">
											Company description
										</label>
										<textarea
											id="company-description"
											value={company_description}
											onChange={(e) =>
												setCompanyDescription(
													e.target.value,
												)
											}
											required
											rows={5}
											placeholder="Tell candidates about your company"
										/>
									</div>
								</div>

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
				</div>
			</section>
		</BaseLayout>
	);
};

export default PostJobPage;
