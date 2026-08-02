/* eslint-disable */
import React, { useState, useContext, useRef, useEffect, FC } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import AxiosConfig from "../AxiosConfig";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, Navigate, useNavigate } from "react-router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import toast from "react-hot-toast";

import "../assets/css/auth.css";

interface IJwtPayload extends JwtPayload {
	user: any;
}

type FieldErrors = {
	email?: string;
	password?: string;
};

const LoginPage: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [errors, setErrors] = useState<FieldErrors>({});
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const _isMounted = useRef(true);

	useEffect(() => {
		return () => {
			_isMounted.current = false;
		};
	}, []);

	const validate = (): FieldErrors => {
		const next: FieldErrors = {};
		if (!email.trim()) next.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			next.email = "Enter a valid email address";
		}
		if (!password) next.password = "Password is required";
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
		};

		const loginUser = async () => {
			try {
				const res = await AxiosConfig.post("login/", postData);
				let decoded = jwtDecode<IJwtPayload>(res.data.access);
				authContext.authDispatch({
					type: authContext.ActionTypes.LOGIN,
					payload: {
						user: decoded.user || {},
						token: res.data.access,
						refreshToken: res.data.refresh,
					},
				});
				toast.success("Logged in successfully");
				setSubmitted(false);
				if (_isMounted.current) {
					navigate("/");
				}
			} catch (err: any) {
				if (err.response && err.response.status === 401) {
					toast.error("Login failed");
				} else {
					toast.error("Login failed");
				}
				setSubmitted(false);
			}
		};

		loginUser().then();
	};

	if (authContext.state.isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return (
		<React.Fragment>
			<Header />
			<Helmet>
				<title>Login</title>
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
							<h2>Find work that fits you</h2>
							<p>
								Sign in to track applications, update your
								profile, and keep your job search moving.
							</p>
						</div>
						<ul className="auth-aside__points">
							<li>Browse open roles across companies</li>
							<li>Apply and track your status in one place</li>
							<li>Keep your profile ready for employers</li>
						</ul>
					</aside>

					<div className="auth-panel">
						<div className="auth-panel__header">
							<h1>Welcome back</h1>
							<p>Sign in with your email to continue.</p>
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
										if (errors.email) {
											setErrors((prev) => ({
												...prev,
												email: undefined,
											}));
										}
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
										errors.password ? " is-invalid" : ""
									}`}
									autoComplete="current-password"
									value={password}
									aria-invalid={Boolean(errors.password)}
									aria-describedby={
										errors.password
											? "password-error"
											: undefined
									}
									onChange={(e) => {
										setPassword(e.target.value);
										if (errors.password) {
											setErrors((prev) => ({
												...prev,
												password: undefined,
											}));
										}
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
										Signing in...
									</>
								) : (
									"Sign in"
								)}
							</button>
						</form>

						<p className="auth-switch">
							Don&apos;t have an account?{" "}
							<NavLink to="/register">Create one</NavLink>
						</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LoginPage;
