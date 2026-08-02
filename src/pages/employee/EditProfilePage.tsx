/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import "../../assets/css/edit-profile.css";

type FieldErrors = {
	first_name?: string;
	last_name?: string;
	gender?: string;
};

const EditProfilePage: FC = () => {
	const { t } = useTranslation();
	const authContext = useContext(AuthContext);
	const { user, token } = authContext.state;

	const [gender, setGender] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState<FieldErrors>({});

	useEffect(() => {
		setFirstName(user?.first_name || "");
		setLastName(user?.last_name || "");
		setGender(user?.gender || "");
	}, [user?.first_name, user?.last_name, user?.gender]);

	const initials = [first_name, last_name]
		.filter(Boolean)
		.map((part) => part.trim().charAt(0).toUpperCase())
		.join("")
		.slice(0, 2);

	const displayName =
		[first_name, last_name].filter(Boolean).join(" ").trim() ||
		"Your profile";

	const validate = (): FieldErrors => {
		const next: FieldErrors = {};
		if (!first_name.trim()) next.first_name = "First name is required";
		if (!last_name.trim()) next.last_name = "Last name is required";
		if (!gender) next.gender = "Please select a gender";
		return next;
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const nextErrors = validate();
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			toast.error("Please fill in all required fields");
			return;
		}

		setSubmitted(true);

		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const data = {
			first_name: first_name.trim(),
			last_name: last_name.trim(),
			gender,
		};

		AxiosConfig.put(`employee/profile/`, data, config)
			.then(() => {
				authContext.authDispatch({
					type: authContext.ActionTypes.LOGIN,
					payload: {
						user: {
							...user,
							...data,
						},
						token,
						refreshToken: authContext.state.refreshToken,
					},
				});
				toast.success("Profile updated successfully");
			})
			.catch(() => toast.error("Failed to update profile"))
			.finally(() => setSubmitted(false));
	};

	return (
		<React.Fragment>
			<Header />
			<Helmet>
				<title>{t("employee:edit-profile")}</title>
			</Helmet>

			<div className="page-header">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="inner-header">
								<h3>{t("employee:edit-profile")}</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

			<section className="section edit-profile edit-profile__section">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-7 col-md-10 col-xs-12">
							<div className="edit-profile__panel">
								<div className="edit-profile__identity">
									<div
										className="edit-profile__avatar"
										aria-hidden="true"
									>
										{initials || "JP"}
									</div>
									<div className="edit-profile__who">
										<h2 className="edit-profile__name">
											{displayName}
										</h2>
										{user?.email && (
											<p className="edit-profile__meta">
												{user.email}
											</p>
										)}
										<span className="edit-profile__badge">
											Job seeker
										</span>
									</div>
								</div>

								<div className="edit-profile__body">
									<p className="edit-profile__intro">
										Keep your name and details current so
										employers see the right information on
										your applications.
									</p>

									<form
										className="edit-profile__form"
										onSubmit={handleSubmit}
										noValidate
									>
										<div className="form-row-pair">
											<div className="form-group">
												<label
													className="edit-profile__label"
													htmlFor="first_name"
												>
													First name
												</label>
												<input
													id="first_name"
													type="text"
													name="first_name"
													className={`edit-profile__input${
														errors.first_name
															? " is-invalid"
															: ""
													}`}
													autoComplete="given-name"
													value={first_name}
													aria-invalid={Boolean(
														errors.first_name,
													)}
													aria-describedby={
														errors.first_name
															? "first_name-error"
															: undefined
													}
													onChange={(e) => {
														setFirstName(
															e.target.value,
														);
														if (errors.first_name) {
															setErrors(
																(prev) => ({
																	...prev,
																	first_name:
																		undefined,
																}),
															);
														}
													}}
												/>
												{errors.first_name && (
													<span
														id="first_name-error"
														className="edit-profile__error"
													>
														{errors.first_name}
													</span>
												)}
											</div>

											<div className="form-group">
												<label
													className="edit-profile__label"
													htmlFor="last_name"
												>
													Last name
												</label>
												<input
													id="last_name"
													type="text"
													name="last_name"
													className={`edit-profile__input${
														errors.last_name
															? " is-invalid"
															: ""
													}`}
													autoComplete="family-name"
													value={last_name}
													aria-invalid={Boolean(
														errors.last_name,
													)}
													aria-describedby={
														errors.last_name
															? "last_name-error"
															: undefined
													}
													onChange={(e) => {
														setLastName(
															e.target.value,
														);
														if (errors.last_name) {
															setErrors(
																(prev) => ({
																	...prev,
																	last_name:
																		undefined,
																}),
															);
														}
													}}
												/>
												{errors.last_name && (
													<span
														id="last_name-error"
														className="edit-profile__error"
													>
														{errors.last_name}
													</span>
												)}
											</div>
										</div>

										<div className="form-group">
											<label
												className="edit-profile__label"
												htmlFor="gender"
											>
												Gender
											</label>
											<select
												id="gender"
												name="gender"
												className={`edit-profile__select${
													errors.gender
														? " is-invalid"
														: ""
												}`}
												value={gender}
												aria-invalid={Boolean(
													errors.gender,
												)}
												aria-describedby={
													errors.gender
														? "gender-error"
														: undefined
												}
												onChange={(e) => {
													setGender(e.target.value);
													if (errors.gender) {
														setErrors((prev) => ({
															...prev,
															gender: undefined,
														}));
													}
												}}
											>
												<option value="">
													Select gender
												</option>
												<option value="male">
													Male
												</option>
												<option value="female">
													Female
												</option>
											</select>
											{errors.gender && (
												<span
													id="gender-error"
													className="edit-profile__error"
												>
													{errors.gender}
												</span>
											)}
										</div>

										<div className="edit-profile__actions">
											<button
												type="submit"
												disabled={submitted}
												className="edit-profile__submit"
											>
												{submitted ? (
													<>
														<span
															className="spinner-border spinner-border-sm"
															role="status"
															aria-hidden="true"
														/>
														Saving...
													</>
												) : (
													"Save changes"
												)}
											</button>
											<Link
												to="/applied-jobs"
												className="edit-profile__secondary"
											>
												View applied jobs
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</React.Fragment>
	);
};

export default EditProfilePage;
