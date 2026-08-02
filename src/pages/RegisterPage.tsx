/* eslint-disable */
import React, { useState, useContext, FC } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, Navigate } from "react-router";
import toast from "react-hot-toast";
import "../assets/css/auth.css";

type FieldErrors = {
	email?: string;
	password?: string;
	password2?: string;
	gender?: string;
	role?: string;
};

const RegisterPage: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState<FieldErrors>({});
	const authContext = useContext(AuthContext);

	const clearError = (field: keyof FieldErrors) => {
		setErrors((prev) => {
			if (!prev[field]) return prev;
			return { ...prev, [field]: undefined };
		});
	};

	const validate = (): FieldErrors => {
		const next: FieldErrors = {};
		if (!email.trim()) next.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			next.email = "Enter a valid email address";
		}
		if (!password) next.password = "Password is required";
		else if (password.length < 6) {
			next.password = "Password must be at least 6 characters";
		}
		if (!password2) next.password2 = "Confirm your password";
		else if (password !== password2) {
			next.password2 = "Passwords do not match";
		}
		if (!gender) next.gender = "Please select a gender";
		if (!role) next.role = "Please choose an account type";
		return next;
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
		evt.preventDefault();
		const nextErrors = validate();
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			toast.error("Please fill in all required fields");
			return;
		}

		setSubmitted(true);

		const postData = {
			email: email.trim(),
			password: password,
			password2: password2,
			gender: gender,
			role: role,
		};

		AxiosConfig.post("register/", postData)
			.then((res) => {
				setSubmitted(false);
				toast.success("Registered successfully");
				if (res.status == 201) setRedirect(true);
			})
			.catch(() => {
				setSubmitted(false);
				toast.error("Register failed");
			});
	};

	if (authContext.state.isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	if (redirect) {
		return <Navigate to="/login" replace />;
	}

	return (
		<React.Fragment>
			<Header />
			<Helmet>
				<title>Register</title>
			</Helmet>

			<div className="auth-page">
				<div className="auth-shell">
					<aside className="auth-aside" aria-hidden="true">
						<div className="auth-aside__brand">
							<span className="auth-aside__mark">J</span>
							<span className="auth-aside__brand-text">
								Job Portal
							</span>
						</div>
						<div className="auth-aside__copy">
							<h2>Start your next opportunity</h2>
							<p>
								Create an account to apply for jobs or post
								openings for your team.
							</p>
						</div>
						<ul className="auth-aside__points">
							<li>Job seekers can apply in a few steps</li>
							<li>Employers can post roles and review applicants</li>
							<li>One account to manage your hiring path</li>
						</ul>
					</aside>

					<div className="auth-panel">
						<div className="auth-panel__header">
							<h1>Create your account</h1>
							<p>Join Job Portal with a few details.</p>
						</div>

						<form
							className="auth-form"
							onSubmit={handleSubmit}
							noValidate
						>
							<div className="form-group">
								<label className="auth-label" htmlFor="email">
									Email
								</label>
								<input
									type="email"
									id="email"
									className={`auth-input${
										errors.email ? " is-invalid" : ""
									}`}
									name="email"
									autoComplete="email"
									value={email}
									aria-invalid={Boolean(errors.email)}
									aria-describedby={
										errors.email
											? "email-error"
											: undefined
									}
									onChange={(e) => {
										setEmail(e.target.value);
										clearError("email");
									}}
								/>
								{errors.email && (
									<span
										id="email-error"
										className="auth-error"
									>
										{errors.email}
									</span>
								)}
							</div>

							<div className="form-row-pair">
								<div className="form-group">
									<label
										className="auth-label"
										htmlFor="password"
									>
										Password
									</label>
									<input
										type="password"
										id="password"
										className={`auth-input${
											errors.password
												? " is-invalid"
												: ""
										}`}
										autoComplete="new-password"
										value={password}
										aria-invalid={Boolean(errors.password)}
										aria-describedby={
											errors.password
												? "password-error"
												: undefined
										}
										onChange={(e) => {
											setPassword(e.target.value);
											clearError("password");
										}}
									/>
									{errors.password && (
										<span
											id="password-error"
											className="auth-error"
										>
											{errors.password}
										</span>
									)}
								</div>

								<div className="form-group">
									<label
										className="auth-label"
										htmlFor="password2"
									>
										Confirm password
									</label>
									<input
										type="password"
										id="password2"
										className={`auth-input${
											errors.password2
												? " is-invalid"
												: ""
										}`}
										autoComplete="new-password"
										value={password2}
										aria-invalid={Boolean(
											errors.password2,
										)}
										aria-describedby={
											errors.password2
												? "password2-error"
												: undefined
										}
										onChange={(e) => {
											setPassword2(e.target.value);
											clearError("password2");
										}}
									/>
									{errors.password2 && (
										<span
											id="password2-error"
											className="auth-error"
										>
											{errors.password2}
										</span>
									)}
								</div>
							</div>

							<div className="form-group">
								<label className="auth-label" htmlFor="gender">
									Gender
								</label>
								<select
									id="gender"
									className={`auth-select${
										errors.gender ? " is-invalid" : ""
									}`}
									value={gender}
									aria-invalid={Boolean(errors.gender)}
									aria-describedby={
										errors.gender
											? "gender-error"
											: undefined
									}
									onChange={(e) => {
										setGender(e.target.value);
										clearError("gender");
									}}
								>
									<option value="">Select gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
								{errors.gender && (
									<span
										id="gender-error"
										className="auth-error"
									>
										{errors.gender}
									</span>
								)}
							</div>

							<fieldset className="form-group">
								<legend className="auth-label">
									Account type
								</legend>
								<div
									className={`auth-role-grid${
										errors.role ? " is-invalid" : ""
									}`}
									role="radiogroup"
									aria-invalid={Boolean(errors.role)}
									aria-describedby={
										errors.role ? "role-error" : undefined
									}
								>
									<label
										className={`auth-role${
											errors.role ? " is-invalid" : ""
										}`}
									>
										<input
											type="radio"
											name="role"
											value="employee"
											checked={role === "employee"}
											onChange={(e) => {
												setRole(e.target.value);
												clearError("role");
											}}
										/>
										<span className="auth-role__card">
											<span className="auth-role__title">
												Job seeker
											</span>
											<span className="auth-role__hint">
												Find and apply to open roles
											</span>
										</span>
									</label>
									<label
										className={`auth-role${
											errors.role ? " is-invalid" : ""
										}`}
									>
										<input
											type="radio"
											name="role"
											value="employer"
											checked={role === "employer"}
											onChange={(e) => {
												setRole(e.target.value);
												clearError("role");
											}}
										/>
										<span className="auth-role__card">
											<span className="auth-role__title">
												Employer
											</span>
											<span className="auth-role__hint">
												Post jobs and review applicants
											</span>
										</span>
									</label>
								</div>
								{errors.role && (
									<span
										id="role-error"
										className="auth-error"
									>
										{errors.role}
									</span>
								)}
							</fieldset>

							<button
								type="submit"
								disabled={submitted}
								className="auth-submit"
							>
								{submitted ? (
									<>
										<span
											className="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										/>
										Creating account...
									</>
								) : (
									"Create account"
								)}
							</button>
						</form>

						<p className="auth-switch">
							Already have an account?{" "}
							<NavLink to="/login">Sign in</NavLink>
						</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default RegisterPage;
